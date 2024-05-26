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

import useCreateAuctionHook from "../../../hooks/useCreateAuctionHook";

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

type tAuction = {
  auctionID: string;
  title: string;
  description: string;
  minBid: string;
  startTime: string;
  endTime: string;
  auctionStartTime: string;
  auctionEndTime: string;
};

const initialAuction: tAuction = {
  auctionID: '',
  title: '',
  description: '',
  minBid: '',
  startTime: '',
  endTime: '',
  auctionStartTime: '',
  auctionEndTime: '',
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

  // useState for iAuction
  const [auction, setAuction] = useState<tAuction>(initialAuction);

  const writeUserData = async (_auction: tAuction) => {

   const receipAuction = await useCreateAuctionHook(JSON.stringify(_auction));
   
   if (receipAuction !== undefined) {
    _auction.auctionID = receipAuction;
  }   

    
    const db = getDatabase(firebaseApp);
    console.log(_auction)
    console.log('WTF')
    console.log(_auction.auctionID)
    set(ref(db, 'listAuctions/auctionId/' + _auction.auctionID), {
      title: _auction.title,
      description: _auction.description,
      minBid: _auction.minBid,
      startTime: _auction.startTime,
      endTime: _auction.endTime,
      auctionStartTime: _auction.auctionStartTime,
      auctionEndTime: _auction.auctionEndTime, 
    }).then((res) => {
      console.log('Data saved successfully')
      console.log(_auction)
    }
    ).catch((error) => {
      console.log('Data could not be saved.' + error)
    });

  }

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Form submitted');
    const newAuction: tAuction = {
      auctionID: auction.title + Math.random().toString(36).substring(7),
      title: auction.title,
      description: auction.description,
      minBid: auction.minBid,
      startTime: auction.startTime,
      endTime: auction.endTime,
      auctionStartTime: auction.auctionStartTime,
      auctionEndTime: auction.auctionEndTime,
    };
    console.log('New Auction');
    console.log(newAuction);
    if (newAuction) {
      setAuction({
        ...auction,
      });
      writeUserData(newAuction);
    }
  };
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
                <form className="grid gap-6" onSubmit={handleFormSubmit}>
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="Enter a title" type="text" onChange={(e) => {
                      setAuction({
                      ...auction,
                      title: e.target.value
                    })}} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Describe your item" 
                    onChange={(e) => {
                      setAuction({
                      ...auction,
                      description: "Wer braucht beschreibung amk??"
                    })}
                    }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="starting-bid">Starting Bid</Label>
                    <div className="flex items-center gap-2">
                      <Input id="starting-bid" min="0" step="50" type="number"
                      onChange={
                        (e) => {
                          setAuction({
                            ...auction,
                            minBid: e.target.value
                          })
                        }
                      } />
                      <span className="text-gray-500 dark:text-gray-400">USD</span>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="auction-start">Auction Start</Label>
                    <Input id="auction-start" type="date" 
                    onChange={
                      (e) => {
                        setAuction({
                          ...auction,
                          auctionStartTime: e.target.value
                        })
                      }
                    } />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="auction-end">Auction End</Label>
                    <Input id="auction-end" type="date" onChange={
                      (e) => {
                        setAuction({
                          ...auction,
                          auctionEndTime: e.target.value
                        })
                      }
                    } />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="listing-start">Listing Start</Label>
                    <Input id="listing-start" type="date" onChange={
                      (e) => {
                        setAuction({
                          ...auction,
                          startTime: e.target.value
                        })
                      }
                    } />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="listing-end">Listing End</Label>
                    <Input id="listing-end" type="date" onChange={
                      (e) => {
                        setAuction({
                          ...auction,
                          endTime: e.target.value
                        })
                      }
                    } />
                  </div>
                  <Button size="lg" >Create Listing</Button>
                </form>
              </CardContent>
            </Card>
          </div>
      </div>
    </div>
  );
};

export default CreateAuction;
