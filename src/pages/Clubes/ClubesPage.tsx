import { useEffect, useState } from "react";
import { ClubDAO } from "../../models/club";
import "./ClubesPage.scss";
import { createSolicitud, getAllClubs } from "../../service/club/club.service";
import { useAppSelector } from "../../redux/store/hooks";

export const ClubesPage = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [clubs, setClubs] = useState<ClubDAO[]>([]);
  useEffect(() => {
    getAllClubs()
      .then((resp) => {
        setClubs(resp)
      })
      .catch((error) => console.error(error));
    return () => {
      setClubs([]);
    };
  }, []);

  const handleMakeRequest = async(clubId:number) => {
    try {
      await createSolicitud(clubId, user!.id);
    } catch (error) {
      
    }
  }

  const renderClubCart = (club: ClubDAO) => {
    return (
      <div key={club.id} className="club-cart">
        <div className="club-cart__image"></div>
        <div className="club-cart__info">
          <span className="club-cart__info__title">{club.nombre}</span>
          <span>{club.ciudad}</span>
        </div>
        <div className="club-cart__actions">
          <button onClick={() => handleMakeRequest(club.id)}>Realizar solicitud</button>
        </div>
      </div>
    );
  };

  return (
    <div className="clubs-page">
      <div className="clubs-page__header">
        <h1>Clubes deportivos</h1>
      </div>
      <div className="clubs-page__content">
        {clubs.map((club) => renderClubCart(club))}
      </div>
    </div>
  );
};
