/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";


import EncryptedERC20ABI from "../../../abis/EncryptedERC20.json";
import {
  ActivityNFT__factory,
  ActivityNFTFactory__factory,
  BlindAuction__factory,
  EncryptedERC20__factory
} from "@/types";
import { Address } from "cluster";

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
  auctionCreator: string;
  activityNFTAddress:string;
};

const initialAuction: tAuction = {
  auctionID: '0x0000000000000000000000000000000000000000',
  title: "",
  description: "",
  minBid: "",
  startTime: "",
  endTime: "",
  auctionStartTime: "",
  auctionEndTime: "",
  auctionCreator: '0x0000000000000000000000000000000000000000',
  activityNFTAddress:'0x0000000000000000000000000000000000000000',
};

//const provider = new ethers.providers.Web3Provider((window as any).ethereum);
//const signer = provider.getSigner();

//https://betybed-7aa8d-default-rtdb.europe-west1.firebasedatabase.app/
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgWyENrwhXuxs-HGs48ge0ZK7q2KiHO54",
  authDomain: "betybed-7aa8d.firebaseapp.com",
  databaseURL:
    "https://betybed-7aa8d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "betybed-7aa8d",
  storageBucket: "betybed-7aa8d.appspot.com",
  messagingSenderId: "514652504524",
  appId: "1:514652504524:web:1cc7d749203fb9faf99d69",
};

const CreateAuction = () => {
  const firebaseApp = initializeApp(firebaseConfig);
  const [auction, setAuction] = useState<tAuction>(initialAuction);
  const [activityNFTAddress, setActivityNFTAddress] = useState<string>()
  const [blindAuctionAddress, setBlindAuctionAddress] = useState<string>()


  // Write user data to the Firebase
  const writeUserData = async (_auction: tAuction) => {
    const db = getDatabase(firebaseApp);
    set(ref(db, "listAuctions/auctionId/" + _auction.auctionID), {
      title: _auction.title,
      description: _auction.description,
      minBid: _auction.minBid,
      startTime: _auction.startTime,
      endTime: _auction.endTime,
      auctionStartTime: _auction.auctionStartTime,
      auctionEndTime: _auction.auctionEndTime,
      activityNFTAddress: _auction.activityNFTAddress,
      auctionCreator: _auction.auctionCreator,
    })
      .then((res) => {
        console.log("Data saved successfully");
        console.log(_auction);
      })
      .catch((error) => {
        console.log("Data could not be saved." + error);
      });
  };

  // activityRight: Description what the buyer gets
  const createActivityNFT = async (activityRight: string) => {
    const activityNFTFactoryAddress =
      "0xF7eE09CE742962b0c5542C5cbE3aBf76D9e0831c";
    const eerc20Address = "0xaA19c1C539B6bc0D491Ee02E8A55eF2E486CebAe";
    if (!activityRight) {
      alert("Please enter an activity right.");
      return;
    }
    const provider = new ethers.BrowserProvider((window as any).ethereum);

    // Create a signer
    const signer = await provider.getSigner();
    //const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    console.log("Signer: ", signer);

    // Connect to the ActivityNFTFactory contract
    const activityNFTFactory = ActivityNFTFactory__factory.connect(activityNFTFactoryAddress, signer)

    const eerc20 = EncryptedERC20__factory.connect(
      eerc20Address, signer)
    const eerc20Addi = await eerc20.getAddress();

    console.log("Tryyyy", signer.address);
    try {
      /*
    const result = await activityNFTFactory.createActivityNFT(activityRight,
       eerc20.getAddress(),
        1000,
      this.signers.dave.address,
       100)
    */
      // Replace this with your token minting logic if necessary,
      // for now, we assume the signer has the required tokens
      const createTx = await activityNFTFactory.createActivityNFT(
        activityRight,
        eerc20Address,
        1000,
        signer.address,
        100
      );
      const receipt = await createTx.wait();
      console.log(receipt);

      const filter = activityNFTFactory.filters["ActivityNFTCreated(address,address)"]
      const events = await activityNFTFactory.queryFilter(filter, -10)
      const event = events[0]

      const args = event.args;
      const activityNFTAddress = args[0];
      const activityNFT = ActivityNFT__factory.connect(activityNFTAddress, signer);
      const blindAuctionAddress = args[1]; // primary key !! 🚀
      const blindAuction = BlindAuction__factory.connect(blindAuctionAddress, signer);

      console.log("ActivityNFT created at address: ", activityNFTAddress);
      setActivityNFTAddress(activityNFTAddress.toString());
      console.log("BlindAuction created at address: ", blindAuctionAddress);
      setBlindAuctionAddress(blindAuctionAddress.toString());

      return {
        activityNFTAddress: activityNFTAddress.toString(),
        blindAuctionAddress: blindAuctionAddress.toString(),
      }
    } catch (error) {
      console.error("Failed to create ActivityNFT", error);
    }
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const provider = new ethers.BrowserProvider((window as any).ethereum);

    // Create a signer
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();
    console.log("Form submitted");
    const newAuction: tAuction = {
      auctionID: blindAuctionAddress,
      title: auction.title,
      description: auction.description,
      minBid: auction.minBid,
      startTime: auction.startTime,
      endTime: auction.endTime,
      auctionStartTime: auction.auctionStartTime,
      auctionEndTime: auction.auctionEndTime,
      auctionCreator: signerAddress,
      activityNFTAddress: activityNFTAddress,
    };
    console.log("New Auction");
    console.log(newAuction);
    if (newAuction) {
      setAuction({
        ...auction,
      });
      createActivityNFT(newAuction.title)
        .then((res) => {
          console.log("ActivityNFT created");
          console.log(res);
          writeUserData({
            ...newAuction,
            auctionID: res?.blindAuctionAddress || "",
            activityNFTAddress: res?.activityNFTAddress || "",
          });
        })
        .catch((error) => {
          console.log("ActivityNFT could not be created." + error);
      });

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
                  <Input
                    id="title"
                    placeholder="Enter a title"
                    type="text"
                    onChange={(e) => {
                      setAuction({
                        ...auction,
                        title: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Describe your item"
                    type="text"
                    onChange={(e) => {
                      setAuction({
                        ...auction,
                        description: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="starting-bid">Starting Bid</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="starting-bid"
                      min="0"
                      step="50"
                      type="number"
                      onChange={(e) => {
                        setAuction({
                          ...auction,
                          minBid: e.target.value,
                        });
                      }}
                    />
                    <span className="text-gray-500 dark:text-gray-400">
                      USD
                    </span>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="auction-start">Auction Start</Label>
                  <Input
                    id="auction-start"
                    type="date"
                    onChange={(e) => {
                      setAuction({
                        ...auction,
                        auctionStartTime: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="auction-end">Auction End</Label>
                  <Input
                    id="auction-end"
                    type="date"
                    onChange={(e) => {
                      setAuction({
                        ...auction,
                        auctionEndTime: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="listing-start">Listing Start</Label>
                  <Input
                    id="listing-start"
                    type="date"
                    onChange={(e) => {
                      setAuction({
                        ...auction,
                        startTime: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="listing-end">Listing End</Label>
                  <Input
                    id="listing-end"
                    type="date"
                    onChange={(e) => {
                      setAuction({
                        ...auction,
                        endTime: e.target.value,
                      });
                    }}
                  />
                </div>
                <Button className="text-[#151515]" size="lg">Create Listing</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateAuction;
