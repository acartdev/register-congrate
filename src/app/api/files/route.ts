// app/api/upload/route.js
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';
import { db, storage } from '@/config/firebase.config';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: 'No file provided or file is not a File.' },
        { status: 400 },
      );
    }

    const storageRef = ref(
      storage,
      `uploads/${(file as File).name ?? 'uploaded-file'}`,
    );

    // อัปโหลดไฟล์ไปยัง Firebase Storage
    const snapshot = await uploadBytes(storageRef, file as Blob);
    const downloadURL = await getDownloadURL(snapshot.ref);

    // เก็บลิงก์ลงใน Firestore
    await addDoc(collection(db, 'files'), {
      fileName: file.name,
      url: downloadURL,
      uploadedAt: new Date(),
    });

    return NextResponse.json({
      message: 'File uploaded successfully!',
      url: downloadURL,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to upload file.' },
      { status: 500 },
    );
  }
}
