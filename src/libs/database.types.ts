export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number;
          checksum: string;
          finished_at: string | null;
          id: string;
          logs: string | null;
          migration_name: string;
          rolled_back_at: string | null;
          started_at: string;
        };
        Insert: {
          applied_steps_count?: number;
          checksum: string;
          finished_at?: string | null;
          id: string;
          logs?: string | null;
          migration_name: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Update: {
          applied_steps_count?: number;
          checksum?: string;
          finished_at?: string | null;
          id?: string;
          logs?: string | null;
          migration_name?: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Relationships: [];
      };
      Account: {
        Row: {
          accountId: string;
          accountType: string;
          createdAt: string;
          updatedAt: string;
          userId: string;
        };
        Insert: {
          accountId: string;
          accountType: string;
          createdAt?: string;
          updatedAt: string;
          userId: string;
        };
        Update: {
          accountId?: string;
          accountType?: string;
          createdAt?: string;
          updatedAt?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Account_userId_fkey";
            columns: ["userId"];
            referencedRelation: "User";
            referencedColumns: ["userId"];
          }
        ];
      };
      Holding: {
        Row: {
          accountId: string;
          acquisitionPrice: number;
          acquisitionPriceJPY: number | null;
          createdAt: string;
          holdingId: string;
          numberOfSharesHeld: number;
          stockId: string;
          updatedAt: string;
          userId: string;
        };
        Insert: {
          accountId: string;
          acquisitionPrice: number;
          acquisitionPriceJPY?: number | null;
          createdAt?: string;
          holdingId: string;
          numberOfSharesHeld: number;
          stockId: string;
          updatedAt: string;
          userId: string;
        };
        Update: {
          accountId?: string;
          acquisitionPrice?: number;
          acquisitionPriceJPY?: number | null;
          createdAt?: string;
          holdingId?: string;
          numberOfSharesHeld?: number;
          stockId?: string;
          updatedAt?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Holding_accountId_fkey";
            columns: ["accountId"];
            referencedRelation: "Account";
            referencedColumns: ["accountId"];
          },
          {
            foreignKeyName: "Holding_stockId_fkey";
            columns: ["stockId"];
            referencedRelation: "Stock";
            referencedColumns: ["stockId"];
          },
          {
            foreignKeyName: "Holding_userId_fkey";
            columns: ["userId"];
            referencedRelation: "User";
            referencedColumns: ["userId"];
          }
        ];
      };
      Stock: {
        Row: {
          createdAt: string;
          currentStockPrice: number;
          dividend: number;
          industry: string | null;
          marketType: string;
          stockCode: string;
          stockId: string;
          stockName: string;
          updatedAt: string;
        };
        Insert: {
          createdAt?: string;
          currentStockPrice: number;
          dividend: number;
          industry?: string | null;
          marketType: string;
          stockCode: string;
          stockId: string;
          stockName: string;
          updatedAt: string;
        };
        Update: {
          createdAt?: string;
          currentStockPrice?: number;
          dividend?: number;
          industry?: string | null;
          marketType?: string;
          stockCode?: string;
          stockId?: string;
          stockName?: string;
          updatedAt?: string;
        };
        Relationships: [];
      };
      User: {
        Row: {
          createdAt: string;
          email: string;
          updatedAt: string;
          userId: string;
        };
        Insert: {
          createdAt?: string;
          email: string;
          updatedAt: string;
          userId: string;
        };
        Update: {
          createdAt?: string;
          email?: string;
          updatedAt?: string;
          userId?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
