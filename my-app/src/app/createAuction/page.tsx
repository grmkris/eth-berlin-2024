/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

import { start } from "repl";

/*
Example Auction:
{
  "Title": "Bedroom3",
  "Description": "Cozy Bedroom Center City",
  "minBid": "300",
  "startTime": "25052024",
  "endTime": "25062024",
  "auctionStartTime": "25042024",
  "auctionEndTime": "25052024"
}
*/

type iAuction = {
  Title: string;
  Description: string;
  minBid: string;
  startTime: string;
  endTime: string;
  auctionStartTime: string;
  auctionEndTime: string;
};

//https://betybed-7aa8d-default-rtdb.europe-west1.firebasedatabase.app/
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgWyENrwhXuxs-HGs48ge0ZK7q2KiHO54",
  authDomain: "betybed-7aa8d.firebaseapp.com",
  databaseURL: "https://betybed-7aa8d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "betybed-7aa8d",
  storageBucket: "betybed-7aa8d.appspot.com",
  messagingSenderId: "514652504524",
  appId: "1:514652504524:web:1cc7d749203fb9faf99d69"
};



const CreateAuction = () => {

  const firebaseApp = initializeApp(firebaseConfig);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [minBid, setMinBid] = useState('');
  const [startTime, setStartTime] = useState(''); 
  const [endTime, setEndTime] = useState(''); 
  const [auctionEndTime, setAuctionEndTime] = useState('');
  const [auctionStartTime, setAuctionStartTime] = useState(''); 
  const [auctionOwnerAddress, setAuctionOwnerAddress] = useState(''); 


  function writeUserData(auctionID: string, _title: string, _description: string, _minBid: string, _startTime: string, _endTime: string, _auctionStartTime: string, _auctionEndTime: string) {
    
    const db = getDatabase(firebaseApp);
    // set(ref(db, 'listAuctions/' + auctionID), {
    //   title: title,
    //   description: description,
    //   minBid : minBid,
    //   startTime: startTime,
    //   endTime: endTime,
    //   auctionStartTime: auctionStartTime,
    //   auctionEndTime: auctionEndTime, 
    // });
    
    set(ref(db, 'listAuctions/auctionId/' + auctionID), {
      title: "title1",
      description: "description1",
      minBid :"minBid1",
      startTime: "startTime1",
      endTime: "endTime1",
      auctionStartTime: "auctionStartTime1",
      auctionEndTime: "auctionEndTime1", 
    });
  }
  useEffect(() => {
    writeUserData("Idbjkadhsdjncdkjbfbsjf", title, description, minBid, startTime, endTime, auctionStartTime, auctionEndTime);
  }, [title, description, minBid, startTime, endTime, auctionStartTime, auctionEndTime, writeUserData]); // Add dependencies as needed
  
  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Create Auction</h1>
          <p className="text-gray-500 dark:text-gray-400">
            List your item for auction and let buyers bid on it.
          </p>
        </div>
        <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>List an Item</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="Enter a title" type="text" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Describe your item" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="starting-bid">Starting Bid</Label>
                    <div className="flex items-center gap-2">
                      <Input id="starting-bid" min="0" step="50" type="number" />
                      <span className="text-gray-500 dark:text-gray-400">USD</span>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="auction-start">Auction Start</Label>
                    <Input id="auction-start" type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="auction-end">Auction End</Label>
                    <Input id="auction-end" type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="listing-start">Listing Start</Label>
                    <Input id="listing-start" type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="listing-end">Listing End</Label>
                    <Input id="listing-end" type="date" />
                  </div>
                  <Button size="lg">Create Listing</Button>
                </form>
              </CardContent>
            </Card>
          </div>
      </div>
    </div>
  );
};

export default CreateAuction;
