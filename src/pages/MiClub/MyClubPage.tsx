import { useEffect, useState } from "react";
import { ClubDAO } from "../../models/club";
import {
  acceptDeclineRequest,
  getClubMyDirector,
  getSolicitudByClub,
} from "../../service/club/club.service";
import { useAppSelector } from "../../redux/store/hooks";
import { Table } from "antd";
import { PlayerDAO } from "../../models/player";

import "./MyClubPage.scss";
import { getPlayersByClub } from "../../service/player/player.service";

export const MyClubPage = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [club, setClub] = useState<ClubDAO | null>(null);
  useEffect(() => {
    getClubMyDirector(user!.id)
      .then((resp) => {
        setClub(resp);
      })
      .catch((error) => console.error(error));
    return () => {
      setClub(null);
    };
  }, []);

  const [solicitud, setSolicitudes] = useState<PlayerDAO[]>([]);
  const [players, setPlayers] = useState<PlayerDAO[]>([]);
  useEffect(() => {
    if (club) {
      getSolicitudByClub(club.id)
        .then((resp) => {
          setSolicitudes(resp);
        })
        .catch((error) => console.error(error));
      getPlayersByClub(club.id)
        .then((resp) => {
          setPlayers(resp);
        })
        .catch((error) => console.error(error));
    }
    return () => {
      setSolicitudes([]);
    };
  }, [club]);

  const handleRequest = async (accepted: boolean, playerId: number) => {
    console.log(accepted, playerId);
    try {
      await acceptDeclineRequest(club!.id, playerId, accepted);
      const request = await getSolicitudByClub(club!.id);
      setSolicitudes(request);
      if(accepted){
        const players = await getPlayersByClub(club!.id);
        setPlayers(players);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      title: "Nombre",
      dataIndex: "firstName",
      key: "lastName",
    },
    {
      title: "Apellido",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Edad",
      dataIndex: "age",
      key: "age ",
    },
    {
      title: "Dorsal",
      dataIndex: "jerseyNumber",
      key: "jerseyNumber",
    },
    {
      title: "Posición",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Categoría",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Peso",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "Altura",
      dataIndex: "height",
      key: "height",
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
      render: (_: any, record: PlayerDAO) => (
        <>
          <button onClick={() => handleRequest(true, record.id)}>
            Aceptar
          </button>
          <button
            onClick={() => handleRequest(false, record.id)}
            className="btn-cancel"
          >
            Rechazar
          </button>
        </>
      ),
    },
  ];
  const columnsPlayers = [
    {
      title: "Nombre",
      dataIndex: "firstName",
      key: "lastName",
    },
    {
      title: "Apellido",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Edad",
      dataIndex: "age",
      key: "age ",
    },
    {
      title: "Dorsal",
      dataIndex: "jerseyNumber",
      key: "jerseyNumber",
    },
    {
      title: "Posición",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Categoría",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Peso",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "Altura",
      dataIndex: "height",
      key: "height",
    }
  ];

  return (
    <>
      {club && (
        <div className="info-card">
          <div className="info-card__img"></div>
          <div className="info-card__info">
            <div className="info-card__info__header">{club?.nombre}</div>
            <div className="info-card__info__content">
              <div className="info-card__info__field">
                <label>Ciudad:</label>
                <span>{club?.ciudad}</span>
              </div>
              <div className="info-card__info__field">
                <label>Director:</label>
                <span>{`${user?.name} ${user?.lastName}`}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        <h2>Solicitudes</h2>
        <Table dataSource={solicitud} columns={columns} />
      </div>
      <div>
        <h2>Equipo</h2>
        <Table dataSource={players} columns={columnsPlayers} />
      </div>
    </>
  );
};
