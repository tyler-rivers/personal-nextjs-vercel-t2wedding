"use client";

import React from 'react';
import Image from 'next/image';

interface CardItem {
  title: string;
  description: string;
  link: string;
  imgUrl: string;
  tags: string[]; // Added tags property
}

const lodgingData: CardItem[] = [
  {
    title: 'Crescent Hotel',
    description: 'Known for its stunning views and legendary history, this Victorian hotel is a landmark of Eureka Springs. A unique and memorable experience.',
    imgUrl: '/images/hotels/crescent-hotel-1.jpg',
    link: 'https://www.crescent-hotel.com/',
    tags: [
      'Pet-friendly',
      '$$$'
    ]
  },
  {
    title: 'The Woods Cabins',
    description: 'The Woods Cabins is tucked away on a mountain top with cobble stone walkways and a 15ft waterfall. It’s just a 5-minute walk down a beautiful tree- lined path to the historic Eureka Springs village below.',
    imgUrl: '/images/hotels/the-woods-1.jpg',
    link: 'https://thewoodscabins.com/',
    tags: [
      'Pet-friendly',
      '$$'
    ]
  },
  {
    title: 'Peabody House',
    description: 'The 1883 Peabody House is an exquisite, historic Eureka Springs Lodging. It offers luxurious guest accommodations with the charm of an 1880’s Victorian Inn. You can enjoy your solitude against the mossy cliffs of the Ozarks while being less than 500ft from the center of downtown.',
    imgUrl: '/images/hotels/peabody-1.jpeg',
    link: 'https://eurekaspringspeabody.com/',
    tags: [
      '$$'
    ]
  },
  {
    title: 'Rise Eureka B&B',
    description: 'More small town charm and less cost, the Rise Eureka is a fun, B&B-style accommodation located in the historic district. They provide unique room options which include touches of Eureka’s Victorian past, mingled with the modern quirk and whimsy.',
    imgUrl: '/images/hotels/rise-eureka-1.jpg',
    link: 'https://riseeureka.com/',
    tags: [
      '$'
    ]
  },
  {
    title: 'Arsenic & Old Lace B&B',
    description: 'This luxury Eureka Springs mansion offers top-rated rooms and suites two blocks from the Eureka Springs historic district. Stained-glass windows, original artwork, antiques, luxurious room amenities and crystal chandeliers seamlessly combine old world elegance with today’s modern comforts.',
    imgUrl: '/images/hotels/romance-eureka-1.png',
    link: 'https://eurekaspringsromancebb.com/',
    tags: [
      '$$'
    ]
  },
  {
    title: 'Quality Inn Eureka Springs South',
    description: 'A friendly budget stay in a converted historic building. Park your car for free and hop on the Eureka Springs trolley to reach the downtown historic district.',
    imgUrl: '/images/hotels/quality-inn-eureka-1.jpg',
    link: 'https://www.choicehotels.com/arkansas/eureka-springs/quality-inn-hotels/ar060',
    tags: [
      'Pet-friendly',
      '$'
    ]
  }
];

const attractionsData: CardItem[] = [
  {
    title: 'Historic Downtown',
    description: 'Filled with shopping, dining, nightlife and character, strolling down Spring and Main Streets will create the perfect backdrop to your vacation.',
    imgUrl: '/images/attractions/historic-downtown.jpg',
    link: 'https://eurekaspringsdowntown.com/',
    tags: []
  },
  {
    title: 'Thorncrown Chapel',
    description: 'An architectural marvel and a spiritual retreat, this glass chapel in the woods is a must-see. Its design blends seamlessly with the natural environment.',
    imgUrl: '/images/attractions/thorncrown-chapel.jpg',
    link: 'https://thorncrown.com/',
    tags: []
  },
  {
    title: 'Turpentine Creek Wildlife Refuge',
    description: 'In the Ozark Mountains on 459 acres and home to a variety of exotic and native animals, Turpentine Creek Wildlife Refuge (TCWR) is one of Arkansas’ most respected big cat sanctuaries. As an ethical animal tourism destination accredited by the Global Federation of Animal Sanctuaries, this nonprofit is a “top ten” family-friendly Northwest Arkansas attraction and one of the most popular in Eureka Springs.',
    imgUrl: '/images/attractions/turpentine-creek-sanctuary.jpg',
    link: 'https://www.turpentinecreek.org/',
    tags: []
  },
];

const restaurantData: CardItem[] = [
  {
    title: 'Bombadill&apos;s Cafe',
    description: 'A local food truck specialized in comfort food using local ingredients. Includes something for everyone, including the vegans/vegetarians in your life!',
    imgUrl: '/images/restaurants/bombadils-cafe.webp',
    link: 'https://www.bombadilscafe.com/',
    tags: [
      'Vegan/Vegetarian Available',
      '$'
    ]
    
  },
  {
    title: 'Three Birds Cafe',
    description: 'Using only the best ingredients and adding a lot of LOVE and PASSION for the culinary arts, Three Bird Cafe is a creative labor of love for Chef Jennifer & Rayna McDermott and their little birdie, Emmie!',
    imgUrl: '/images/restaurants/three-birds-cafe.jpg',
    link: 'https://www.threebirdcafe.com/',
    tags: [
      'Vegan/Vegetarian Available',
      '$'
    ]
  },
  {
    title: 'Local Flavor Cafe',
    description: 'Enjoy a quaint and eclectic dining experience in the heart of Historic Downtown Eureka Springs, Arkansas. Local Flavor Café offers fresh and creative dishes for Lunch, Dinner and Sunday Brunch. Delightful dining in a warm, friendly environment rich with art...',
    imgUrl: '/images/restaurants/local-flavor-cafe.jpg',
    link: 'https://localflavorcafe.net/',
    tags: [
      'Vegan/Vegetarian Available',
      '$$'
    ]
  },
];

const TownSection = () => {

  const Card = ({ item }: { item: CardItem }) => (
    <a 
      href={item.link} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="block bg-gray-900 rounded shadow-md overflow-hidden transform hover:scale-[1.03] transition duration-300 group"
    >
      <div className="relative w-full h-48 overflow-hidden">
        <Image 
          fill
          src={item.imgUrl}
          alt={item.title}
          className="relative w-full h-48 object-cover transition-opacity duration-300 group-hover:opacity-80"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-6">
        <h4 className="text-xl font-bold mb-1 font-horley text-[#f2df93ff] group-hover:underline">{item.title}</h4>
        
        {/* Tags Section */}
        <div className="flex flex-wrap gap-2 mb-3">
          {item.tags.map((tag, tagIndex) => (
            <span 
              key={tagIndex} 
              className="text-xs font-medium text-[#f7fbfc] bg-indigo-700/60 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <p className="text-sm text-gray-300">{item.description}</p>
      </div>
    </a>
  );

  return (
    <section id="town" className="">
      <h2 className="text-3xl font-bold text-center mb-8 font-horley text-[#f2df93ff]">Eureka Springs, Arkansas</h2>
      <p className="text-center text-gray-300 max-w-2xl mx-auto mb-12">
        Anyone who hasn&apos;t visited the &lsquo;Switzerland of the Ozarks&lsquo; is in for a treat. We fell in love with Eureka springs for its size (population 2,166), rolling hills and historic Victorian-style buildings.
      </p>
      <p className="text-center text-gray-300 max-w-2xl mx-auto mb-12">It&apos;s a beautiful place that we think has the same kind of romance that we want to build our lives on.</p>
      <p className="text-center text-gray-300 max-w-2xl mx-auto mb-12">We&apos;ve listed some lodging options below, beyond just the Crescent, as well as some attractions. We can&apos;t wait to spend time with our loved ones, in such a charming little town.</p>

      <h3 className="text-2xl font-bold mb-6 text-center font-horley text-[#f2df93ff]">Recommended Lodging</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {lodgingData.map((hotel, index) => (
          <Card key={index} item={hotel} />
        ))}
      </div>
      
      <h3 className="text-2xl font-bold mb-6 text-center font-horley text-[#f2df93ff]">Recommended Dining</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {restaurantData.map((restaurant, index) => (
          <Card key={index} item={restaurant} />
        ))}
      </div>

      <h3 className="text-2xl font-bold mb-6 text-center font-horley text-[#f2df93ff]">Local Attractions</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {attractionsData.map((attraction, index) => (
          <Card key={index} item={attraction} />
        ))}
      </div>
    </section>
  );
};

export default TownSection;
