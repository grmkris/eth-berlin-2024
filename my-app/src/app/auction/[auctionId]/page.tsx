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


export default function AuctionDetail({
  params,
}: {
  params: { auctionId: tAuction };
}) {
  //return <div>My Post: {params.auctionId}</div>
  const firebaseApp = initializeApp(firebaseConfig);
  const [data, setData] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    const db = getDatabase(firebaseApp);
  
    const updateStarCount = (postElement: HTMLElement, data: string): void => {
      postElement.textContent = data;
    }
  
    const starCountRef = ref(db, 'listAuctions/auctionId/' + params.auctionId.auctionID);
  
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
                <h1 className="text-2xl font-bold">Antique Pocket Watch</h1>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Product ID: #12345
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
                This exquisite antique pocket watch is a true masterpiece of
                craftsmanship. Crafted in the late 19th century, it features a
                beautifully engraved case and a high-quality mechanical movement
                that keeps time with precision. The watch is in excellent
                condition, with a well-preserved dial and a smooth-running
                mechanism.
              </p>
              <p>
                The pocket watch is a testament to the skill and artistry of its
                makers, and it would make a stunning addition to any collection
                or a cherished heirloom to be passed down through generations.
                Dont miss your chance to own this remarkable piece of history.
              </p>
            </div>
            <div className="grid gap-4">
              <h2 className="text-lg font-bold">Specifications</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="grid gap-1">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Brand
                  </div>
                  <div>Acme Timepieces</div>
                </div>
                <div className="grid gap-1">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Movement
                  </div>
                  <div>Mechanical, manual-winding</div>
                </div>
                <div className="grid gap-1">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Case Material
                  </div>
                  <div>Solid 14k gold</div>
                </div>
                <div className="grid gap-1">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Dial
                  </div>
                  <div>White enamel, Roman numerals</div>
                </div>
                <div className="grid gap-1">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Dimensions
                  </div>
                  <div>45mm diameter, 12mm thickness</div>
                </div>
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
                  <div className="text-2xl font-bold">$44</div>
                </div>
                <div className="grid gap-1">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Auction Ends
                  </div>
                  <div>June 15, 2025 at 8:00 PM EST</div>
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
              <form className="grid gap-4">
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
                <Button className="text-[#151515]" size="lg">Place Bid</Button>
              </form>
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
                  <div className="font-medium">John Smith</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Seller since 2015
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
          <Card>
            <CardHeader>
              <CardTitle>Shipping & Returns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-1">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Shipping
                  </div>
                  <div>
                    Free shipping to the continental US. International shipping
                    available for an additional fee.
                  </div>
                </div>
                <div className="grid gap-1">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Returns
                  </div>
                  <div>
                    30-day returns. Item must be in original condition. Buyer is
                    responsible for return shipping costs.
                  </div>
                </div>
                <div className="grid gap-1">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Payment Methods
                  </div>
                  <div>
                    We accept Visa, Mastercard, American Express, and PayPal.
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
