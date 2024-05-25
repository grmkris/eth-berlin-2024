import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


const auctionOverview = () => {
  return (
    <>
      <div className="flex justify-between items-start mb-8">
        <h1 className="text-2xl font-bold">Auction Offers Overview</h1>
        <Button variant="secondary">Create Offer</Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Antique Vase</CardTitle>
          </CardHeader>
          <CardContent>
            <img
              alt="Antique Vase"
              className="w-full h-auto"
              height="200"
              src="/placeholder.svg"
              style={{
                aspectRatio: "200/200",
                objectFit: "cover",
              }}
              width="200"
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <span className="font-semibold">Min. bid: $500</span>
            <Button variant="outline">View</Button>
          </CardFooter>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Rare Painting</CardTitle>
          </CardHeader>
          <CardContent>
            <img
              alt="Rare Painting"
              className="w-full h-auto"
              height="200"
              src="/placeholder.svg"
              style={{
                aspectRatio: "200/200",
                objectFit: "cover",
              }}
              width="200"
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <span className="font-semibold">Min. bid: $1,200</span>
            <Button variant="outline">View</Button>
          </CardFooter>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Vintage Watch</CardTitle>
          </CardHeader>
          <CardContent>
            <img
              alt="Vintage Watch"
              className="w-full h-auto"
              height="200"
              src="/placeholder.svg"
              style={{
                aspectRatio: "200/200",
                objectFit: "cover",
              }}
              width="200"
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <span className="font-semibold">Min. bid: $800</span>
            <Button variant="outline">View</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default auctionOverview;
