import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("../components/Map"), { ssr: false });

const Profile = () => {
  const router = useRouter();
  const { id } = router.query;
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/profile?id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            setProfileData(data.profile);
          } else {
            alert("Profile not found");
          }
        });
    }
  }, [id]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Head>
        <title>Profile</title>
        <link rel="stylesheet" href="/css/style.css" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet/dist/leaflet.css"
        />
      </Head>
      <div className="container mt-5">
        <div className="card">
          <div className="card-header bg-primary text-white text-center">
            <img
              src={profileData.photoUrl}
              alt="Photo"
              className="profile-photo rounded-circle"
            />
            <h2>{profileData.name}</h2>
            <p>{profileData.contact}</p>
          </div>
          <div className="card-body">
            <p>
              <strong>Alamat:</strong> {profileData.address}
            </p>
            <p>
              <strong>Riwayat Kesehatan:</strong> {profileData.health}
            </p>
            <p>
              <strong>Alergi:</strong> {profileData.allergy}
            </p>
            <div id="map" style={{ height: "300px" }}>
              <MapWithNoSSR address={profileData.address} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
