export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      agent_votes: {
        Row: {
          agent_id: string | null
          created_at: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          agent_id?: string | null
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          agent_id?: string | null
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_votes_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      agents: {
        Row: {
          auth_type: Database["public"]["Enums"]["auth_type"] | null
          categories: string[] | null
          created_at: string | null
          deployment_instructions: string | null
          description: string
          documentation: string | null
          endpoint: string | null
          examples: string[] | null
          featured: boolean | null
          forks: number | null
          github_url: string | null
          id: string
          is_verified: boolean | null
          last_updated: string | null
          logo: string | null
          name: string
          provider: string
          skills: string[] | null
          stars: number | null
          updated_at: string | null
          user_id: string | null
          votes: number | null
        }
        Insert: {
          auth_type?: Database["public"]["Enums"]["auth_type"] | null
          categories?: string[] | null
          created_at?: string | null
          deployment_instructions?: string | null
          description: string
          documentation?: string | null
          endpoint?: string | null
          examples?: string[] | null
          featured?: boolean | null
          forks?: number | null
          github_url?: string | null
          id?: string
          is_verified?: boolean | null
          last_updated?: string | null
          logo?: string | null
          name: string
          provider: string
          skills?: string[] | null
          stars?: number | null
          updated_at?: string | null
          user_id?: string | null
          votes?: number | null
        }
        Update: {
          auth_type?: Database["public"]["Enums"]["auth_type"] | null
          categories?: string[] | null
          created_at?: string | null
          deployment_instructions?: string | null
          description?: string
          documentation?: string | null
          endpoint?: string | null
          examples?: string[] | null
          featured?: boolean | null
          forks?: number | null
          github_url?: string | null
          id?: string
          is_verified?: boolean | null
          last_updated?: string | null
          logo?: string | null
          name?: string
          provider?: string
          skills?: string[] | null
          stars?: number | null
          updated_at?: string | null
          user_id?: string | null
          votes?: number | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string | null
          description: string
          icon: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description: string
          icon: string
          id: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string
          icon?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      expert_votes: {
        Row: {
          created_at: string | null
          expert_id: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          expert_id?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          expert_id?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      experts: {
        Row: {
          availability: string | null
          avatar_url: string | null
          categories: string[] | null
          created_at: string | null
          description: string
          experience_years: number | null
          featured: boolean | null
          github_url: string | null
          hourly_rate: number | null
          id: string
          is_verified: boolean | null
          linkedin_url: string | null
          location: string | null
          name: string
          portfolio_url: string | null
          provider: string
          rating: number | null
          reviews_count: number | null
          skills: string[] | null
          updated_at: string | null
          user_id: string | null
          votes: number | null
        }
        Insert: {
          availability?: string | null
          avatar_url?: string | null
          categories?: string[] | null
          created_at?: string | null
          description: string
          experience_years?: number | null
          featured?: boolean | null
          github_url?: string | null
          hourly_rate?: number | null
          id?: string
          is_verified?: boolean | null
          linkedin_url?: string | null
          location?: string | null
          name: string
          portfolio_url?: string | null
          provider: string
          rating?: number | null
          reviews_count?: number | null
          skills?: string[] | null
          updated_at?: string | null
          user_id?: string | null
          votes?: number | null
        }
        Update: {
          availability?: string | null
          avatar_url?: string | null
          categories?: string[] | null
          created_at?: string | null
          description?: string
          experience_years?: number | null
          featured?: boolean | null
          github_url?: string | null
          hourly_rate?: number | null
          id?: string
          is_verified?: boolean | null
          linkedin_url?: string | null
          location?: string | null
          name?: string
          portfolio_url?: string | null
          provider?: string
          rating?: number | null
          reviews_count?: number | null
          skills?: string[] | null
          updated_at?: string | null
          user_id?: string | null
          votes?: number | null
        }
        Relationships: []
      }
      mcp_server_votes: {
        Row: {
          created_at: string | null
          id: string
          mcp_server_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          mcp_server_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          mcp_server_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mcp_server_votes_mcp_server_id_fkey"
            columns: ["mcp_server_id"]
            isOneToOne: false
            referencedRelation: "mcp_servers"
            referencedColumns: ["id"]
          },
        ]
      }
      mcp_servers: {
        Row: {
          auth_required: boolean | null
          auth_type: string | null
          categories: string[] | null
          connection_url: string | null
          created_at: string | null
          description: string
          forks: number | null
          github_url: string | null
          id: string
          install_command: string | null
          is_verified: boolean | null
          last_updated: string | null
          logo: string | null
          name: string
          package_name: string | null
          port: number | null
          provider: string
          repository_url: string | null
          run_command: string | null
          server_type: string | null
          skills: string[] | null
          stars: number | null
          updated_at: string | null
          user_id: string | null
          votes: number | null
        }
        Insert: {
          auth_required?: boolean | null
          auth_type?: string | null
          categories?: string[] | null
          connection_url?: string | null
          created_at?: string | null
          description: string
          forks?: number | null
          github_url?: string | null
          id?: string
          install_command?: string | null
          is_verified?: boolean | null
          last_updated?: string | null
          logo?: string | null
          name: string
          package_name?: string | null
          port?: number | null
          provider: string
          repository_url?: string | null
          run_command?: string | null
          server_type?: string | null
          skills?: string[] | null
          stars?: number | null
          updated_at?: string | null
          user_id?: string | null
          votes?: number | null
        }
        Update: {
          auth_required?: boolean | null
          auth_type?: string | null
          categories?: string[] | null
          connection_url?: string | null
          created_at?: string | null
          description?: string
          forks?: number | null
          github_url?: string | null
          id?: string
          install_command?: string | null
          is_verified?: boolean | null
          last_updated?: string | null
          logo?: string | null
          name?: string
          package_name?: string | null
          port?: number | null
          provider?: string
          repository_url?: string | null
          run_command?: string | null
          server_type?: string | null
          skills?: string[] | null
          stars?: number | null
          updated_at?: string | null
          user_id?: string | null
          votes?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      work_requests: {
        Row: {
          created_at: string
          description: string
          file_urls: string[] | null
          id: string
          service_source: string | null
          status: string | null
          updated_at: string
          user_email: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          description: string
          file_urls?: string[] | null
          id?: string
          service_source?: string | null
          status?: string | null
          updated_at?: string
          user_email?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          file_urls?: string[] | null
          id?: string
          service_source?: string | null
          status?: string | null
          updated_at?: string
          user_email?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      auth_type: "API Key" | "OAuth" | "Bearer Token" | "Basic Auth"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      auth_type: ["API Key", "OAuth", "Bearer Token", "Basic Auth"],
    },
  },
} as const
