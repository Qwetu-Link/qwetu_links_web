import PropertyPage from "./(features)/_portfolio/_component/_propertylisting/propertyPage";

// import RentalPropertyPage from "./(features)/_portfolio/_component/_propertylisting/RentalPage";

export default function Home() {
  return <PropertyPage listingLimit={6} />;
  // return <RentalPropertyPage/>
}
