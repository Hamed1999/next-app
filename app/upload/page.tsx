"use client";
import {
  CldUploadButton,
  CldImage,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { useState } from "react";

interface CloudinaryResult {
  public_id: string;
  width: number;
  height: number;
}

const UploadPage = () => {
  const [publicIds, setPublicIds] = useState<CloudinaryResult[]>([]);

  const handleSuccess = (result: CloudinaryUploadWidgetResults) => {
    if (result.event !== "success") return;
    const info = result.info as CloudinaryResult;
    console.log("pId:", info.public_id);
    if (!info?.public_id) return;
    setPublicIds((prev) => [...prev, info]);
  };

  return (
    <>
      <div className="flex gap-4 flex-wrap">
        {publicIds.map((info) => {
          const displayWidth = 270;
          const height = Math.round((displayWidth * info.height) / info.width);
          return (
            <CldImage
              key={info.public_id}
              src={info.public_id}
              width={displayWidth}
              height={height}
              alt={`uploaded ${info.public_id}`}
              className="object-cover"
            />
          );
        })}
      </div>

      <CldUploadButton
        uploadPreset="hamedcloud"
        className="btn btn-primary rounded-md mt-4"
        onSuccess={(result) => handleSuccess(result)}
        options={{
          sources: ["local", "camera"],
          googleApiKey: "<image_search_google_api_key>",
          defaultSource: "local",
          styles: {
            palette: {
              window: "#FFFFFF",
              windowBorder: "#6A7481",
              tabIcon: "#3448C5",
              menuIcons: "#5A616A",
              textDark: "#000000",
              textLight: "#FFFFFF",
              link: "#3448C5",
              action: "#3448C5",
              inactiveTabIcon: "#0E2F5A",
              error: "#F44235",
              inProgress: "#3448C5",
              complete: "#20B832",
              sourceBg: "#F5FAFE",
            },
            fonts: {
              default: null,
              "'Fira Sans', sans-serif": {
                url: "https://fonts.googleapis.com/css?family=Fira+Sans",
                active: true,
              },
            },
          },
        }}
      >
        Upload Images
      </CldUploadButton>
    </>
  );
};

export default UploadPage;
