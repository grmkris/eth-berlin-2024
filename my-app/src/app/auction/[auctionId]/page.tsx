"use client";

import {
  CarouselItem,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
  Carousel,
} from "@/components/ui/carousel";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import Link from "next/link";
import { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

import { onValue } from "firebase/database";
import {useMutation, useQuery} from "wagmi/query";
import {BlindAuction__factory, EncryptedERC20__factory} from "@/types";
import {ethers} from "ethers";
import {useParams} from "next/navigation";
import {getInstance, getInstanceDynamically} from "@/app/fhevm";


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
};

const initialAuction: tAuction = {
  auctionID: "",
  title: "",
  description: "",
  minBid: "",
  startTime: "",
  endTime: "",
  auctionStartTime: "",
  auctionEndTime: "",
  auctionCreator: "",
};

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

interface BigInt {
  /** Convert to BigInt to string form in JSON.stringify */
  toJSON: () => string;
}
BigInt.prototype.toJSON = function () {
  return this.toString();
};

export default function AuctionDetail() {
  //return <div>My Post: {params.auctionId}</div>
  const params = useParams<{ auctionId: string }>()
  const firebaseApp = initializeApp(firebaseConfig);
  const [data, setData] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    const db = getDatabase(firebaseApp);

    const updateStarCount = (postElement: HTMLElement, data: string): void => {
      postElement.textContent = data;
    }

    const starCountRef = ref(db, 'listAuctions/auctionId/' + params.auctionId);

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

  const placeBid = useMutation({
    onError: (error) => {
      console.log("error", error)
    },
    mutationFn: async (bidAmount: number) => {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      console.log("params.auctionId.auctionID", params.auctionId)
      // Create a signer
      const signer = await provider.getSigner();
      const blindAuction = BlindAuction__factory.connect(params.auctionId, signer);
      const eerc20Address = "0xaA19c1C539B6bc0D491Ee02E8A55eF2E486CebAe";
      const instance = await getInstanceDynamically({
        contractAddress: eerc20Address,
        signer
      });
      console.log("instance", instance)
      const bobBidAmountEnc = instance.encrypt64(100);
      const eerc20 = EncryptedERC20__factory.connect(
          eerc20Address, signer)
      // approve the blind auction to spend tokens on Bob's behalf
      const approveTx = await eerc20["approve(address,bytes)"](params.auctionId, bobBidAmountEnc);
      console.log("approveTx", approveTx);
      const result = await blindAuction.bid(bobBidAmountEnc, { gasLimit: 5000000 });
      console.log("result", result);

    }
  })


  const stopAuction = useMutation({
    onError: (error) => {
      console.log("error", error)
    },
    mutationFn: async () => {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const blindAuction = BlindAuction__factory.connect(params.auctionId, signer);
      const result = await blindAuction.stop();
      console.log("result", result);
    }
  })

  const claimAuction = useMutation({
    onError: (error) => {
      console.log("error", error)
    },
    mutationFn: async () => {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const blindAuction = BlindAuction__factory.connect(params.auctionId, signer);
      const result = await blindAuction.claim();
      console.log("result", result);
    }
  })

  const auctionEnd = useMutation({
    onError: (error) => {
      console.log("error", error)
    },
    mutationFn: async () => {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const blindAuction = BlindAuction__factory.connect(params.auctionId, signer);
      const result = await blindAuction.auctionEnd();
      console.log("result", result);
    }
  })

  const encryptedBalance = useQuery({
    queryKey: ["encryptedBalance", params.auctionId],
    queryFn: async () => {
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        const signer = await provider.getSigner();
        const eerc20Address = "0xaA19c1C539B6bc0D491Ee02E8A55eF2E486CebAe";
        const instance = await getInstanceDynamically({
            contractAddress: eerc20Address,
            signer
        });
        const signerAddress = await signer.getAddress();
        const token = instance.getPublicKey(eerc20Address)!;
        const balance = await EncryptedERC20__factory.connect(eerc20Address, signer).balanceOf(
            signerAddress,
            token.publicKey,
            token.signature
        );
        const balanceDec = await instance.decrypt(eerc20Address, balance);
        console.log("balanceDec", balanceDec.toString());
        return balanceDec.toString();
    }
  })


  return (
    <>
      <div className="grid lg:grid-cols-[1fr_400px] gap-8 max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid gap-8">
          <div className="grid gap-4">
            <Carousel className="rounded-xl overflow-hidden">
              <CarouselContent>
                <CarouselItem>
                  <img
                    alt="Product Image"
                    className="aspect-[4/3] object-cover w-full"
                    height={600}
                    src="/bed1.png"
                    width={800}
                  />
                </CarouselItem>
                <CarouselItem>
                  <img
                    alt="Product Image"
                    className="aspect-[4/3] object-cover w-full"
                    height={600}
                    src="/placeholder.svg"
                    width={800}
                  />
                </CarouselItem>
                <CarouselItem>
                  <img
                    alt="Product Image"
                    className="aspect-[4/3] object-cover w-full"
                    height={600}
                    src="/placeholder.svg"
                    width={800}
                  />
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">{data.title}</h1>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Product ID: {data.activityNFTAddress}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                <span className="text-sm font-medium">(42 reviews)</span>
              </div>
            </div>
          </div>
          <div className="grid gap-6">
            <div className="prose max-w-none">
              <h2>Description</h2>
              <p>
                {data.description}
              </p>
            </div>
            <div className="grid gap-4">
              <h2 className="text-lg font-bold">Specifications</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="grid gap-1">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Condition
                  </div>
                  <div>Excellent, fully serviced</div>
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              <h2 className="text-lg font-bold">Auction Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="grid gap-1">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Minimum Bid
                  </div>
                  <div className="text-2xl font-bold">{data.minBid}</div>
                </div>
                <div className="grid gap-1">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Auction Ends
                  </div>
                  <div>{data.auctionEndTime}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Place a Bid</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="bid-amount">Bid Amount</Label>
                  <div className="flex items-center gap-2">
                    <Input id="bid-amount" min="1250" step="50" type="number" />
                    <span className="text-gray-500 dark:text-gray-400">
                      USD
                    </span>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="auto-bid">
                    <div className="flex items-center gap-2">
                      <Checkbox id="auto-bid" />
                      Enable Auto-Bid
                    </div>
                  </Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Automatically increase your bid up to the maximum amount you
                    specify.
                  </p>
                </div>
                <>
                Balance of Encrypted Tokens
                {encryptedBalance.isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <div>{JSON.stringify(encryptedBalance.data)}</div>
                )}
                </>
                <Button className="text-[#151515]" size="lg" onClick={() => {
                    placeBid.mutate(1250);
                }}>Place Bid</Button>

                <Button className="text-[#151515]" size="lg" onClick={() => {
                    stopAuction.mutate();
                }}>Stop Auction</Button>

                <Button className="text-[#151515]" size="lg" onClick={() => {
                    claimAuction.mutate();
                }}>Claim Auction</Button>

                <Button className="text-[#151515]" size="lg" onClick={() => {
                    auctionEnd.mutate();
                }}>End Auction</Button>

              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Seller Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12 border">
                  <AvatarImage
                    alt="Seller Avatar"
                    src="/placeholder-user.jpg"
                  />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="font-medium">{data.auctionCreator}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Seller since 2024
                  </div>
                  <div className="flex items-center gap-2">
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <span className="text-sm font-medium">4.9</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      (256 reviews)
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

const StarIcon = (props: any) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
};
