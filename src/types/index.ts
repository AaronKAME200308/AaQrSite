import type { ComponentType } from "react";

export interface SocialLink {
  platform: string;
  url: string;
}

export interface Profile {
  name: string;
  bio: string;
  links: SocialLink[];
}

export interface Platform {
  name: string;
  Icon: ComponentType<{ size?: number; className?: string }>;
  gradient: string;
  glow: string;
  ring: string;
  label: string;
  dark?: boolean;
}

export type PageType = "generator" | "profile";

export type FormData = {
  name: string;
  bio: string;
  instagram: string;
  facebook: string;
  twitter: string;
  tiktok: string;
  youtube: string;
  linkedin: string;
  snapchat: string;
  website: string;
};