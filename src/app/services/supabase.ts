import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  private supabaseUrl = 'https://hkmynanswupttyxljoae.supabase.co';
  private supabaseKey = 'sb_publishable_UkO8RziGBiQIgEijNoLDcg_J_rxL_5T';

  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  get client() {
    return this.supabase;
  }
}