"use client";

export default function OfferDetail({ params }: { params: { offerId: string } }) {
    return <div>My Post: {params.offerId}</div>
  }