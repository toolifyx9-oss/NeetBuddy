/**
 * NEETBuddy Supabase Cloud Integration
 * 
 * Provides unified cloud database sync with Row-Level-Security (RLS),
 * PostgreSQL schema mapping, and fallback synchronization.
 */
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://neetbuddy-cloud.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_anon_key_for_offline_fallback';

let supabaseClient = null;

try {
  supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: false }
  });
  console.log('[Supabase] Initialized cloud client connection for URL:', SUPABASE_URL);
} catch (err) {
  console.warn('[Supabase Warning] Could not initialize cloud client:', err.message);
}

module.exports = {
  client: supabaseClient,
  async syncQuestionToCloud(question) {
    if (!supabaseClient || SUPABASE_URL.includes('dummy')) return null;
    try {
      const { data, error } = await supabaseClient.from('questions').upsert([question]);
      if (error) console.warn('[Supabase Sync Question Warning]:', error.message);
      return data;
    } catch (e) {
      return null;
    }
  },
  async syncAttemptToCloud(attempt) {
    if (!supabaseClient || SUPABASE_URL.includes('dummy')) return null;
    try {
      const { data, error } = await supabaseClient.from('attempts').insert([attempt]);
      if (error) console.warn('[Supabase Sync Attempt Warning]:', error.message);
      return data;
    } catch (e) {
      return null;
    }
  },
  async syncMistakeToCloud(mistake) {
    if (!supabaseClient || SUPABASE_URL.includes('dummy')) return null;
    try {
      const { data, error } = await supabaseClient.from('mistakes').upsert([mistake]);
      if (error) console.warn('[Supabase Sync Mistake Warning]:', error.message);
      return data;
    } catch (e) {
      return null;
    }
  },
  async syncUserToCloud(user) {
    if (!supabaseClient || SUPABASE_URL.includes('dummy')) return null;
    try {
      const { data, error } = await supabaseClient.from('users').upsert([user]);
      if (error) console.warn('[Supabase Sync User Warning]:', error.message);
      return data;
    } catch (e) {
      return null;
    }
  },
  async getUserFromCloud(identifier) {
    if (!supabaseClient || SUPABASE_URL.includes('dummy')) return null;
    try {
      const { data, error } = await supabaseClient
        .from('users')
        .select('*')
        .or(`email.eq.${identifier},phone.eq.${identifier}`)
        .single();
      if (error) return null;
      return data;
    } catch (e) {
      return null;
    }
  },
  async syncContactMessage(contactData) {
    if (!supabaseClient || SUPABASE_URL.includes('dummy')) return null;
    try {
      const { data, error } = await supabaseClient.from('contact_messages').insert([contactData]);
      if (error) console.warn('[Supabase Contact Warning]:', error.message);
      return data;
    } catch (e) {
      return null;
    }
  }
};
