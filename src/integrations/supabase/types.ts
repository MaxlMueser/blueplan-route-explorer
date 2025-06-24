export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ads: {
        Row: {
          budget: number | null
          business_id: string | null
          created_at: string
          description: string | null
          end_date: string
          id: string
          image_url: string | null
          payment_status: string | null
          start_date: string
          status: string | null
          target_audience: Json | null
          title: string
          updated_at: string
        }
        Insert: {
          budget?: number | null
          business_id?: string | null
          created_at?: string
          description?: string | null
          end_date: string
          id?: string
          image_url?: string | null
          payment_status?: string | null
          start_date: string
          status?: string | null
          target_audience?: Json | null
          title: string
          updated_at?: string
        }
        Update: {
          budget?: number | null
          business_id?: string | null
          created_at?: string
          description?: string | null
          end_date?: string
          id?: string
          image_url?: string | null
          payment_status?: string | null
          start_date?: string
          status?: string | null
          target_audience?: Json | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ads_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      "Blue Plan User": {
        Row: {
          created_at: string
          "e-mail": string | null
          id: number
          password: string | null
          username: string | null
        }
        Insert: {
          created_at?: string
          "e-mail"?: string | null
          id?: number
          password?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string
          "e-mail"?: string | null
          id?: number
          password?: string | null
          username?: string | null
        }
        Relationships: []
      }
      business_analytics: {
        Row: {
          business_id: string | null
          created_at: string
          date: string
          id: string
          metric_type: string
          metric_value: number
        }
        Insert: {
          business_id?: string | null
          created_at?: string
          date: string
          id?: string
          metric_type: string
          metric_value: number
        }
        Update: {
          business_id?: string | null
          created_at?: string
          date?: string
          id?: string
          metric_type?: string
          metric_value?: number
        }
        Relationships: [
          {
            foreignKeyName: "business_analytics_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      businesses: {
        Row: {
          address: string | null
          category: string | null
          created_at: string
          description: string | null
          email: string | null
          google_place_id: string | null
          id: string
          images: string[] | null
          name: string
          owner_id: string | null
          phone: string | null
          tags: string[] | null
          updated_at: string
          website_url: string | null
        }
        Insert: {
          address?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          google_place_id?: string | null
          id?: string
          images?: string[] | null
          name: string
          owner_id?: string | null
          phone?: string | null
          tags?: string[] | null
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          address?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          google_place_id?: string | null
          id?: string
          images?: string[] | null
          name?: string
          owner_id?: string | null
          phone?: string | null
          tags?: string[] | null
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      live_events: {
        Row: {
          business_id: string | null
          created_at: string
          current_attendees: number | null
          description: string | null
          duration_hours: number | null
          event_date: string
          id: string
          max_attendees: number | null
          payment_status: string | null
          price: number | null
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          business_id?: string | null
          created_at?: string
          current_attendees?: number | null
          description?: string | null
          duration_hours?: number | null
          event_date: string
          id?: string
          max_attendees?: number | null
          payment_status?: string | null
          price?: number | null
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          business_id?: string | null
          created_at?: string
          current_attendees?: number | null
          description?: string | null
          duration_hours?: number | null
          event_date?: string
          id?: string
          max_attendees?: number | null
          payment_status?: string | null
          price?: number | null
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "live_events_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
