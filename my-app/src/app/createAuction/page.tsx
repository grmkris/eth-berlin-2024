import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

import { getDatabase, ref, set } from "firebase/database";

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



const CreateAuction = () => {

  const database = getDatabase();

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [minBid, setMinBid] = useState(); 



  function writeUserData(userId, name, email, imageUrl) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      username: name,
      email: email,
      profile_picture : imageUrl
    });
  }

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

export default createAuction;
