import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const cardData = [
  {
    title: "1 Shared Bed",
    imgSrc: "/bed1.png",
    minBid: "$500",
    id: "abcd1234",
  },
  {
    title: "2 Single bed",
    imgSrc: "/bed1.png",
    minBid: "$1,200",
    id: "xiuas3412",
  },
  {
    title: "1 Bed",
    imgSrc: "/bed1.png",
    minBid: "$800",
    id: "5233",
  },
  {
    title: "2 Bed reversed",
    imgSrc: "/bed1.png",
    minBid: "$500",
    id: "qwer09238",
  },
  {
    title: "-1 Bed",
    imgSrc: "/bed1.png",
    minBid: "$1,200",
    id: "qwefr09238",
  },
  {
    title: "Stacked non bunk bed",
    imgSrc: "/bed1.png",
    minBid: "$800",
    id: "32sr09238",
  },
];

const AuctionCard = ({
  title,
  imgSrc,
  minBid,
  id
}: {
  title: string;
  imgSrc: string;
  minBid: string;
  id: string;
}) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <img
        alt={title}
        className="w-full h-auto"
        height="200"
        src={imgSrc}
        style={{
          aspectRatio: "200/200",
          objectFit: "cover",
        }}
        width="200"
      />
    </CardContent>
    <CardFooter className="flex justify-between">
      <span className="font-semibold">Min. bid: {minBid}</span>
      <Button variant="outline">
        <Link href={`/auction/${id}`}>View</Link>
      </Button>
    </CardFooter>
  </Card>
);

const auctionOverview = () => {
  return (
    <>
      <div className="flex justify-between items-start mb-8">
        <h1 className="text-2xl font-bold">Auction Offers Overview</h1>
        <Button
          asChild
          className="mt-[10%] w-content p-4 xs:text-l sm:text-l md:text-xl lg:text-3xl"
          variant="outline"
        >
          <Link href="/createAuction">Create Auction</Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {cardData.map((card, index) => (
          <AuctionCard
            key={index}
            title={card.title}
            imgSrc={card.imgSrc}
            minBid={card.minBid}
            id={card.id}
          />
        ))}
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
              src="/bed1.png"
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
