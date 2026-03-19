import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/events/${id}`)
      .then(res => setEvent(res.data.event))
      .catch(() => setEvent(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center py-20">Chargement...</div>;
  if (!event) return <div className="text-center py-20 text-gray-500">Événement introuvable.</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <p className="text-gray-600 mb-6">{event.description}</p>
      <div className="bg-gray-50 rounded-xl p-6 space-y-2">
        <p><span className="font-medium">Date :</span> {new Date(event.startDate).toLocaleDateString('fr-FR')}</p>
        <p><span className="font-medium">Lieu :</span> {event.location}</p>
        <p><span className="font-medium">Places disponibles :</span> {event.availableSpots}</p>
      </div>
    </div>
  );
}