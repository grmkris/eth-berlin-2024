/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { useState, useEffect} from "react";
import { onValue } from "firebase/database";


const AuctionCard = ({
  title,
  description,
  startTime,
  endTime,
  minBid,
  auctionEndTime,
  id
}: {
  title: string;
  description: string,
  startTime: string,
  endTime: string,
  minBid: string;
  auctionEndTime: string,
  id: string;
}) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <p>Available from {startTime} to the {endTime}</p>
    </CardHeader>
    <CardContent className="flex flex-col justify-between">
      <p>{description}</p>
      <img
        alt="Bed image"
        className="w-full h-auto"
        height="200"
        src="/bed1.png"
        style={{
          aspectRatio: "200/200",
          objectFit: "cover",
        }}
        width="200"
      />
    </CardContent>
    <CardFooter className="flex flex-col justify-between">
      <div>
        <span className="font-semibold">Min. bid: {minBid}</span>
        <span className="font-semibold">Auction ends: {auctionEndTime}</span>
      </div>
      <Button variant="outline">
        <Link href={`/auction/${id}`}>View</Link>
      </Button>
    </CardFooter>
  </Card>
);

const firebaseConfig = {
  apiKey: "AIzaSyAgWyENrwhXuxs-HGs48ge0ZK7q2KiHO54",
  authDomain: "betybed-7aa8d.firebaseapp.com",
  databaseURL: "https://betybed-7aa8d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "betybed-7aa8d",
  storageBucket: "betybed-7aa8d.appspot.com",
  messagingSenderId: "514652504524",
  appId: "1:514652504524:web:1cc7d749203fb9faf99d69"
};

const AuctionOverview = () => {

  const firebaseApp = initializeApp(firebaseConfig);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [minBid, setMinBid] = useState('');
  const [startTime, setStartTime] = useState(''); 
  const [endTime, setEndTime] = useState(''); 
  const [auctionEndTime, setAuctionEndTime] = useState('');
  const [auctionStartTime, setAuctionStartTime] = useState('');
  const [data, setData] = useState<{ [key: string]: any }>({});
 
  useEffect(() => {
    const db = getDatabase(firebaseApp);
  
    const updateStarCount = (postElement: HTMLElement, data: string): void => {
      postElement.textContent = data;
    }
  
    const starCountRef = ref(db, 'listAuctions/auctionId/');
  
    const fetchData = () => {
      onValue(starCountRef, (snapshot) => {
        const _data = snapshot.val();
        console.log(_data);
        setData(_data);
        console.log(data);
      });
    };
  
    fetchData(); // Fetch data initially
  
    const interval = setInterval(fetchData, 60000); // Fetch data every 1 minute
  
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);


  return (
    <>
      <div className="flex justify-between items-start mb-8">
        <h1 className="text-2xl font-bold stick-no-bills-800 ">Auction Offers Overview</h1>
        <Button
          asChild
          className="w-content p-4 xs:text-l sm:text-l md:text-xl lg:text-3xl"
          variant="outline"
        >
        <Link className="stick-no-bills-400" href="/createAuction">Create Auction</Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4 stick-no-bills-600">
      {Object.keys(data).map((key) => {
        const auction = data[key];
        return (
          <AuctionCard
            key={auction.key}
            title={auction.title}
            minBid={auction.minBid}
            id={key.toString()}
            description={auction.description}
            startTime={auction.startTime}
            endTime={auction.endTime}
            auctionEndTime={auction.auctionEndTime}
          />
        );
      })}
      </div>

    </>
  );
};

export default AuctionOverview;
