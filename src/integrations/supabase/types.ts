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
      categories: {
        Row: {
          created_at: string | null
          id: string
          name: string
          parent_id: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          name: string
          parent_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          parent_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      order_products: {
        Row: {
          amount: number
          order_id: number
          product_id: string
        }
        Insert: {
          amount: number
          order_id: number
          product_id: string
        }
        Update: {
          amount?: number
          order_id?: number
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_products_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["product_id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          customer_address: string
          customer_email: string
          customer_first_name: string
          customer_last_name: string
          customer_phone: string
          id: number
          status: Database["public"]["Enums"]["order_status"]
          store_id: number
        }
        Insert: {
          created_at?: string | null
          customer_address: string
          customer_email: string
          customer_first_name: string
          customer_last_name: string
          customer_phone: string
          id?: number
          status?: Database["public"]["Enums"]["order_status"]
          store_id: number
        }
        Update: {
          created_at?: string | null
          customer_address?: string
          customer_email?: string
          customer_first_name?: string
          customer_last_name?: string
          customer_phone?: string
          id?: number
          status?: Database["public"]["Enums"]["order_status"]
          store_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "orders_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          catchweight: Json | null
          category_id: string | null
          category_path: Json
          country_of_origin: string | null
          created_at: string | null
          image: Json
          images: Json | null
          name: string
          price: Json
          product_id: string
          retailer_product_id: string
          search_vector: unknown | null
          size: Json
        }
        Insert: {
          catchweight?: Json | null
          category_id?: string | null
          category_path: Json
          country_of_origin?: string | null
          created_at?: string | null
          image: Json
          images?: Json | null
          name: string
          price: Json
          product_id: string
          retailer_product_id: string
          search_vector?: unknown | null
          size: Json
        }
        Update: {
          catchweight?: Json | null
          category_id?: string | null
          category_path?: Json
          country_of_origin?: string | null
          created_at?: string | null
          image?: Json
          images?: Json | null
          name?: string
          price?: Json
          product_id?: string
          retailer_product_id?: string
          search_vector?: unknown | null
          size?: Json
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      store_types: {
        Row: {
          color_hex: string
          id: number
          logo: string
          name: string
        }
        Insert: {
          color_hex: string
          id?: number
          logo: string
          name: string
        }
        Update: {
          color_hex?: string
          id?: number
          logo?: string
          name?: string
        }
        Relationships: []
      }
      stores: {
        Row: {
          auth_id: string | null
          created_at: string | null
          email: string
          id: number
          name: string
          password: string
          store_type_id: number
          sub_domain: string | null
        }
        Insert: {
          auth_id?: string | null
          created_at?: string | null
          email: string
          id?: number
          name: string
          password: string
          store_type_id: number
          sub_domain?: string | null
        }
        Update: {
          auth_id?: string | null
          created_at?: string | null
          email?: string
          id?: number
          name?: string
          password?: string
          store_type_id?: number
          sub_domain?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stores_store_type_id_fkey"
            columns: ["store_type_id"]
            isOneToOne: false
            referencedRelation: "store_types"
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
      order_status: "NEW" | "NOT_HANDLED" | "READY" | "DELIVERED"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
