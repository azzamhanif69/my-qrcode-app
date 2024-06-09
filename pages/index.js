import Head from "next/head";
import React, { useState } from "react";

export default function Home() {
  const [qrCodeData, setQrCodeData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.status === "success") {
      const qrData = `${window.location.origin}/profile?id=${result.id}`;
      setQrCodeData(qrData);
    } else {
      alert("Upload failed");
    }
  };

  return (
    <div>
      <Head>
        <title>QR Code Generator</title>
        <link rel="stylesheet" href="/css/style.css" />
      </Head>
      <div className="container mt-5">
        <h2 className="text-center">QR Code Generator</h2>
        <form
          id="codeForm"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="form-group">
            <label htmlFor="name">Nama:</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact">Nomor Kontak:</label>
            <input
              type="text"
              className="form-control"
              id="contact"
              name="contact"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Alamat:</label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="health">Riwayat Kesehatan:</label>
            <textarea
              className="form-control"
              id="health"
              name="health"
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="allergy">Alergi:</label>
            <textarea
              className="form-control"
              id="allergy"
              name="allergy"
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="photo">Foto:</label>
            <input
              type="file"
              className="form-control-file"
              id="photo"
              name="photo"
              accept="image/*"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Generate QR Code
          </button>
        </form>
        {qrCodeData && (
          <div id="output" className="output mt-4 text-center">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
                qrCodeData
              )}&size=300x300`}
              alt="QR Code"
            />
            <a
              href={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
                qrCodeData
              )}&size=300x300`}
              download="qrcode.png"
              className="btn btn-primary mt-3"
            >
              Download QR Code
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
