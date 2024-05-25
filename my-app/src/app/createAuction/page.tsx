import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";


const createAuction = () => {
  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Create Auction</h1>
          <p className="text-gray-500 dark:text-gray-400">
            List your item for auction and let buyers bid on it.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Auction Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter a title for your auction"
                  type="text"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the item you're auctioning"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="start-time">Start Time</Label>
                  <Input id="start-time" type="datetime-local" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="end-time">End Time</Label>
                  <Input id="end-time" type="datetime-local" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="min-bid">Minimum Bid</Label>
                <Input
                  id="min-bid"
                  placeholder="Enter the minimum bid amount"
                  type="number"
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Create Auction</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default createAuction;
