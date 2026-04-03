/**
 * Backend — Supabase integration for gifts and letters
 * Falls back to localStorage if Supabase is unreachable.
 */
(function () {
  var SUPABASE_URL = 'https://btoqfslwdyynxjaregir.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_Yky005Hts4CQaqRs5ttM0Q_uZYqNsu5';

  var headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': 'Bearer ' + SUPABASE_KEY,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation',
  };

  // ===== Gifts =====

  // Fetch all gift counts from Supabase
  function fetchGifts() {
    return fetch(SUPABASE_URL + '/rest/v1/gifts?select=key,count', { headers: headers })
      .then(function (res) { return res.json(); })
      .then(function (rows) {
        var counts = {};
        rows.forEach(function (r) { counts[r.key] = r.count; });
        // Cache locally
        localStorage.setItem('memorial_gifts', JSON.stringify(counts));
        return counts;
      })
      .catch(function () {
        // Fallback to localStorage
        return JSON.parse(localStorage.getItem('memorial_gifts') || '{}');
      });
  }

  // Increment a gift count atomically via RPC
  function incrementGift(key) {
    return fetch(SUPABASE_URL + '/rest/v1/rpc/increment_gift', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ gift_key: key }),
    })
      .then(function (res) { return res.json(); })
      .then(function (newCount) {
        newCount = parseInt(newCount, 10) || 0;
        var counts = JSON.parse(localStorage.getItem('memorial_gifts') || '{}');
        counts[key] = newCount;
        localStorage.setItem('memorial_gifts', JSON.stringify(counts));
        return newCount;
      })
      .catch(function () {
        // Fallback: increment locally
        var counts = JSON.parse(localStorage.getItem('memorial_gifts') || '{}');
        counts[key] = (counts[key] || 0) + 1;
        localStorage.setItem('memorial_gifts', JSON.stringify(counts));
        return counts[key];
      });
  }

  // ===== Letters =====

  // Fetch all letters from Supabase
  function fetchLetters() {
    return fetch(SUPABASE_URL + '/rest/v1/letters?select=*&order=created_at.asc', { headers: headers })
      .then(function (res) { return res.json(); })
      .then(function (rows) {
        // Cache locally
        localStorage.setItem('memorial_letters_remote', JSON.stringify(rows));
        return rows;
      })
      .catch(function () {
        return JSON.parse(localStorage.getItem('memorial_letters_remote') || '[]');
      });
  }

  // Save a new letter to Supabase
  function saveLetter(letter) {
    return fetch(SUPABASE_URL + '/rest/v1/letters', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(letter),
    })
      .then(function (res) { return res.json(); })
      .then(function (rows) {
        return rows[0] || letter;
      })
      .catch(function () {
        // Fallback: save locally
        var stored = JSON.parse(localStorage.getItem('memorial_letters') || '[]');
        stored.push(letter);
        localStorage.setItem('memorial_letters', JSON.stringify(stored));
        return letter;
      });
  }

  // Expose globally
  window.backend = {
    fetchGifts: fetchGifts,
    incrementGift: incrementGift,
    fetchLetters: fetchLetters,
    saveLetter: saveLetter,
  };
})();
