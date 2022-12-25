import { ColumnType, RawBuilder } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string | RawBuilder, Date | string | RawBuilder>;

export interface Accounts {
  access_token: string | null;
  access_token_expires: Timestamp | null;
  compound_id: string;
  created_at: Generated<Timestamp>;
  id: Generated<number>;
  provider_account_id: string;
  provider_id: string;
  provider_type: string;
  refresh_token: string | null;
  updated_at: Generated<Timestamp>;
  user_id: number;
}

export interface Sessions {
  access_token: string;
  created_at: Generated<Timestamp>;
  expires: Timestamp;
  id: Generated<number>;
  session_token: string;
  updated_at: Generated<Timestamp>;
  user_id: number;
}

export interface Users {
  created_at: Generated<Timestamp>;
  email: string | null;
  email_verified: Timestamp | null;
  id: Generated<number>;
  image: string | null;
  name: string | null;
  updated_at: Generated<Timestamp>;
}

export interface VerificationRequests {
  created_at: Generated<Timestamp>;
  expires: Timestamp;
  id: Generated<number>;
  identifier: string;
  token: string;
  updated_at: Generated<Timestamp>;
}

export interface DB {
  accounts: Accounts;
  sessions: Sessions;
  users: Users;
  verification_requests: VerificationRequests;
}
