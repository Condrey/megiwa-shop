// import { validateRequest } from "@/auth";
// import prisma from "@/lib/db";

// import { MAX_ATTACHMENTS } from "@/lib/constants";
import { createUploadthing, FileRouter } from "uploadthing/next";
// import { UploadThingError, UTApi } from "uploadthing/server";
const f = createUploadthing();

// const avatarRouter = f({
//   image: { maxFileSize: "512KB" },
// })
//   .middleware(async () => {
//     const { user } = await validateRequest();
//     if (!user) throw new UploadThingError("Unauthorized");
//     return { user };
//   })
//   .onUploadComplete(async ({ metadata, file }) => {
//     const oldAvatarUrl = metadata.user.avatarUrl;
//     if (oldAvatarUrl) {
//       const key = oldAvatarUrl.split(
//         `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/`,
//       )[1];
//       await new UTApi().deleteFiles(key);
//     }

//     const newAvatarUrl = file.url.replace(
//       "/f/",
//       `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/`,
//     );

//     await prisma.user.update({
//       where: { id: metadata.user.id },
//       data: {
//         avatarUrl: newAvatarUrl,
//       },
//     });

//     return { avatarUrl: newAvatarUrl };
//   });

// const subjectRouter = f({
//   image: { maxFileSize: "512KB" },
// })
//   .middleware(async () => {
//     const { user } = await validateRequest();
//     if (!user) throw new UploadThingError("Unauthorized");
//     return { user };
//   })

//   .onUploadComplete(async ({ file }) => {
//     const newAvatarUrl = file.url.replace(
//       "/f/",
//       `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/`,
//     );

//     return { avatarUrl: newAvatarUrl };
//   });

// const levelRouter = f({
//   image: { maxFileSize: "512KB" },
// })
//   .middleware(async () => {
//     const { user } = await validateRequest();
//     if (!user) throw new UploadThingError("Unauthorized");
//     return { user };
//   })

//   .onUploadComplete(async ({ file }) => {
//     const newAvatarUrl = file.url.replace(
//       "/f/",
//       `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/`,
//     );

//     return { avatarUrl: newAvatarUrl };
//   });

// const explanationRouter = f({
//   image: { maxFileSize: "2MB" },
// })
//   .middleware(async () => {
//     const { user } = await validateRequest();
//     if (!user) throw new UploadThingError("Unauthorized");
//     return { user };
//   })

//   .onUploadComplete(async ({ file }) => {
//     const newAvatarUrl = file.url.replace(
//       "/f/",
//       `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/`,
//     );

//     return { avatarUrl: newAvatarUrl };
//   });

// const thirdPartyRouter = f({
//   image: { maxFileSize: "2MB" },
// })
//   .middleware(async () => {
//     const { user } = await validateRequest();
//     if (!user) throw new UploadThingError("Unauthorized");
//     return { user };
//   })

//   .onUploadComplete(async ({ file }) => {
//     const newAvatarUrl = file.url.replace(
//       "/f/",
//       `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/`,
//     );

//     return { avatarUrl: newAvatarUrl };
//   });

// const attachmentRouter = f({
//   image: { maxFileSize: "2MB", maxFileCount: MAX_ATTACHMENTS },
//   video: { maxFileSize: "4MB", maxFileCount: MAX_ATTACHMENTS },
// })
//   .middleware(async () => {
//     const { user } = await validateRequest();
//     if (!user) throw new UploadThingError("Unauthorized");
//     return {};
//   })
//   .onUploadComplete(async ({ file }) => {
//     const media = await prisma.image.create({
//       data: {
//         url: file.url.replace(
//           "/f/",
//           `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/`,
//         ),
//         type: file.type.startsWith("image") ? "IMAGE" : "VIDEO",
//       },
//     });

//     return { mediaId: media.id };
//   });

export const fileRouter = {
  // avatar: avatarRouter,
  // attachment: attachmentRouter,
  // answerAttachment: attachmentRouter,
  // subjectAttachment: subjectRouter,
  // levelAttachment: levelRouter,
  // explanationAttachment: explanationRouter,
  // thirdPartyAttachment: thirdPartyRouter,
} satisfies FileRouter;

export type AppFileRouter = typeof fileRouter;
