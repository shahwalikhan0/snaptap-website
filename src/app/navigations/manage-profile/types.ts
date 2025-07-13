// types.ts

// import { RcFile } from "antd/es/upload";

// // Type for managing the profile form values
// export interface ProfileFormValues {
//   username: string;
//   email: string;
//   fullName: string;
//   oldPassword?: string;
//   newPassword?: string;
//   confirmNewPassword?: string;
// }

// // Type for the admin user data (assuming you're getting the admin's data from a context or API)
// export interface AdminData {
//   id: number;
//   username: string;
//   email: string;
//   fullName: string;
//   description: string | null;
//   image_url: string | null;
// }

// // Type for managing the loading state (for updating profile)
// export interface ProfileState {
//   loading: boolean;
// }

// // Type for managing password change validation
// export interface PasswordChange {
//   oldPassword: string;
//   newPassword: string;
//   confirmPassword: string;
// }

// // Type for managing image file upload
// export interface ImageFile {
//   file: RcFile;
//   url?: string; // The URL for the uploaded image (optional, will be set after upload)
// }

// types.ts

// types.ts

// types.ts

export type SectionKey = "profile" | "brand";

export interface ProfileFormValues {
  username?: string;
  email?: string;
  fullName?: string;
  description?: string;
}

export interface BrandDetailFormValues {
  website_url?: string;
  category?: string;
  phone?: string;
  location?: string;
}
export interface BrandFormValues {
  brandName?: string;
  brandDescription?: string;
}
