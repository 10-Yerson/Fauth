'use client';

import axios from '../../../../../utils/axios';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCog } from 'react-icons/fa';

export default function ProfileHeader() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollowedBy, setIsFollowedBy] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/user/${id}`);
        setUser(response.data);
        const currentUserId = sessionStorage.getItem('userId');

        // Actualizar el estado de `isFollowing` y `isFollowedBy` basado en la respuesta
        setIsFollowing(response.data.followers.includes(currentUserId));
        setIsFollowedBy(response.data.following.includes(currentUserId));
      } catch (error) {
        console.error(error);
        toast.error('Error al cargar la información del usuario');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await axios.post(`/api/followers/dejar-seguir/${id}`);
        setIsFollowing(false);
        toast.success('Dejaste de seguir a este usuario');
      } else {
        await axios.post(`/api/followers/seguir/${id}`);
        setIsFollowing(true);
        toast.success('Ahora sigues a este usuario');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error al actualizar el estado de seguimiento');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader">Cargando...</div>
      </div>
    );
  }

  // Determinar el texto del botón de acuerdo a los estados
  const followButtonText = isFollowing
    ? 'Siguiendo'
    : isFollowedBy
      ? 'Seguir de vuelta'
      : 'Seguir';

  return (
    <div className="flex items-center justify-between bg-white">
      <div className="flex items-center">
        <img
          alt="Profile picture of user"
          className="rounded-full border border-gray-200 shadow-lg w-32 h-32 object-cover"
          src={user.profilePicture || "https://storage.googleapis.com/a1aa/image/Mu0ExRQkd0JqAtVC0PkQNVV8VJfpubi9jIe6TyXjgQBngzjTA.jpg"}
        />
        <div className="ml-6">
          <h2 className="text-2xl font-bold text-gray-800">{user.name || 'Nombre de usuario'}</h2>
          <div className="flex space-x-4 mt-2 text-gray-600">
            <div><span className="font-bold">{user.postsCount || 0}</span> publicaciones</div>
            <div><span className="font-bold">{user.followers.length || 0}</span> seguidores</div>
            <div><span className="font-bold">{user.following.length || 0}</span> seguidos</div>
          </div>
          <div className="mt-4 flex space-x-2">
            <button
              className={`px-4 py-1 rounded ${isFollowing ? 'bg-gray-200 text-gray-800' : 'bg-blue-500 text-white'}`}
              onClick={handleFollowToggle}
            >
              {followButtonText}
            </button>
            <button className="px-4 py-1 bg-gray-200 text-gray-800 rounded">Enviar mensaje</button>
            <button className="px-2 py-1 text-gray-800 rounded">
              <FaCog size={24} color="#000" />
            </button>
          </div>
        </div>
      </div>
      <div className="text-2xl">
        <i className="fas fa-ellipsis-h"></i>
      </div>
      <ToastContainer/>
    </div>
  );
}
