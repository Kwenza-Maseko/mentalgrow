'use client';

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { DataTable } from "@/components/DataTable";
import { Appointment } from "@/components/DataTable";
import { Skeleton } from "@/components/ui/skeleton";
import GoBackButton from "@/components/GoBackButton";

const TherapistAppointments = () => {
  const { user, isLoaded } = useUser();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (isLoaded && user) {
        const therapistName = user.fullName;
        const q = query(collection(db, "appointment"), where("therapist", "==", therapistName));

        const querySnapshot = await getDocs(q);
        const fetchedAppointments: Appointment[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Appointment));

        setAppointments(fetchedAppointments);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user, isLoaded]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-2xl">
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl skeleton" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px] skeleton" />
          <Skeleton className="h-4 w-[200px] skeleton" />
        </div>
      </div>
    </div>;
  }

  return (
    <div className="screen p-1">
      <div className="p-3 hdhd mb-3"><GoBackButton />
        <div>
          <h1 className="h1 font-bold">Appointments List
          </h1>
        </div>
      </div>
      <DataTable data={appointments} />
    </div>
  );
};

export default TherapistAppointments;
