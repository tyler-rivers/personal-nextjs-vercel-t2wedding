"use client";

import React from 'react';

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
    imgUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.qMkFP-JWKkxCszxG2m0V8wHaE8%3Fcb%3D12%26pid%3DApi&f=1&ipt=fc9048bb70e180c48cb5974994a08ad9c66e2bc9c1888e75cc6bcd96182c2319&ipo=images',
    link: 'https://www.crescent-hotel.com/',
    tags: [
      'Pet-friendly',
      '$$$'
    ]
  },
  {
    title: 'The Woods Cabins',
    description: 'The Woods Cabins is tucked away on a mountain top with cobble stone walkways and a 15ft waterfall. It’s just a 5-minute walk down a beautiful tree- lined path to the historic Eureka Springs village below.',
    imgUrl: 'https://thewoodscabins.com/wp-content/uploads/2025/02/cabinstop.jpg',
    link: 'https://thewoodscabins.com/',
    tags: [
      'Pet-friendly',
      '$$'
    ]
  },
  {
    title: 'Peabody House',
    description: 'The 1883 Peabody House is an exquisite, historic Eureka Springs Lodging. It offers luxurious guest accommodations with the charm of an 1880’s Victorian Inn. You can enjoy your solitude against the mossy cliffs of the Ozarks while being less than 500ft from the center of downtown.',
    imgUrl: 'https://eurekaspringspeabody.com/wp-content/uploads/2024/10/wz8lpppvsqcrvj0p149w-534x352x3x0x529x352x1602632221.jpeg',
    link: 'https://eurekaspringspeabody.com/',
    tags: [
      'Pet-friendly',
      '$$'
    ]
  },
  {
    title: 'Rise Eureka B&B',
    description: 'More small town charm and less cost, the Rise Eureka is a fun, B&B-style accommodation located in the historic district. They provide unique room options which include touches of Eureka’s Victorian past, mingled with the modern quirk and whimsy.',
    imgUrl: 'https://riseeureka.com/wp-content/uploads/2025/02/Rise-Eureka-BB-Home-Intro.jpg',
    link: 'https://riseeureka.com/',
    tags: [
      'Pet-friendly',
      '$'
    ]
  },
  {
    title: 'Arsenic & Old Lace B&B',
    description: 'This luxury Eureka Springs mansion offers top-rated rooms and suites two blocks from the Eureka Springs historic district. Stained-glass windows, original artwork, antiques, luxurious room amenities and crystal chandeliers seamlessly combine old world elegance with today’s modern comforts.',
    imgUrl: 'https://eurekaspringsromancebb.com/_next/image?url=https%3A%2F%2Fmedia-bridge.thinkreservations.com%2Fmedia-library%2Fhotels%2F543438396625%2Fa25c32a5-b33f-48c8-8a29-e0dccd7576ef%2Fimage%20(2)%20(1).png&w=3840&q=75',
    link: 'https://eurekaspringsromancebb.com/',
    tags: [
      'Pet-friendly',
      '$$'
    ]
  },
  {
    title: 'Quality Inn Eureka Springs South',
    description: 'A friendly budget stay in a converted historic building. Park your car for free and hop on the Eureka Springs trolley to reach the downtown historic district.',
    imgUrl: 'https://www.choicehotels.com/hoteldam/ar/ar060/images/1280/AR060exterior1.jpg?webp=true',
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
    imgUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd194ip2226q57d.cloudfront.net%2Fimages%2FDowntown-Eureka_Flat-Irons_CO-Eureka-Springs-CA.original.jpg&f=1&nofb=1&ipt=9370ff70ea4335985d4be34305b1fd429ddcf8c277467f1f2be990aa228d0676',
    link: 'https://eurekaspringsdowntown.com/',
    tags: []
  },
  {
    title: 'Thorncrown Chapel',
    description: 'An architectural marvel and a spiritual retreat, this glass chapel in the woods is a must-see. Its design blends seamlessly with the natural environment.',
    imgUrl: 'https://thorncrown.com/images/542g.jpg',
    link: 'https://thorncrown.com/',
    tags: []
  },
  {
    title: 'Turpentine Creek Wildlife Refuge',
    description: 'In the Ozark Mountains on 459 acres and home to a variety of exotic and native animals, Turpentine Creek Wildlife Refuge (TCWR) is one of Arkansas’ most respected big cat sanctuaries. As an ethical animal tourism destination accredited by the Global Federation of Animal Sanctuaries, this nonprofit is a “top ten” family-friendly Northwest Arkansas attraction and one of the most popular in Eureka Springs.',
    imgUrl: 'https://www.turpentinecreek.org/wp-content/uploads/2024/02/Poncho-tiger-at-Turpentine-Creek-Wildlife-Refuge-scaled-e1708357941691.jpg',
    link: 'https://www.turpentinecreek.org/',
    tags: []
  },
];

const restaurantData: CardItem[] = [
  {
    title: 'Bombadill\'s Cafe',
    description: 'A local food truck specialized in comfort food using local ingredients. Includes something for everyone, including the vegans/vegetarians in your life!',
    imgUrl: 'https://images.squarespace-cdn.com/content/v1/58aca3791b631b773ee3540e/1678043165430-OLLVYPTGR6PT79NXBVMN/tempImageDjEcXA.gif?format=2500w',
    link: 'https://www.bombadilscafe.com/',
    tags: [
      'Vegan/Vegetarian Available',
      '$'
    ]
    
  },
  {
    title: 'Three Birds Cafe',
    description: 'Using only the best ingredients and adding a lot of LOVE and PASSION for the culinary arts, Three Bird Cafe is a creative labor of love for Chef Jennifer & Rayna McDermott and their little birdie, Emmie!',
    imgUrl: 'https://static.wixstatic.com/media/96d804_f65d6807bacb46dd8292e9c44a04feac~mv2.jpg/v1/fill/w_1170,h_1028,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/96d804_f65d6807bacb46dd8292e9c44a04feac~mv2.jpg',
    link: 'https://thorncrown.com/',
    tags: [
      'Vegan/Vegetarian Available',
      '$'
    ]
  },
  {
    title: 'Local Flavor Cafe',
    description: 'Enjoy a quaint and eclectic dining experience in the heart of Historic Downtown Eureka Springs, Arkansas. Local Flavor Café offers fresh and creative dishes for Lunch, Dinner and Sunday Brunch. Delightful dining in a warm, friendly environment rich with art...',
    imgUrl: 'https://localflavorcafe.net/images/p_home_06.jpg',
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
      <img
        src={item.imgUrl}
        alt={item.title}
        className="w-full h-48 object-cover transition-opacity duration-300 group-hover:opacity-80"
      />
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
      <h2 className="text-3xl font-bold text-center mb-8 font-horley text-[#f2df93ff]">Eureka Springs,</h2>
      <p className="text-center text-gray-300 max-w-2xl mx-auto mb-12">
        Anyone who hasn't visited the "Switzerland of the Ozarks" is in for a treat. We fell in love with Eureka springs for its size (population 2,166), rolling hills and historic Victorian-style buildings.
      </p>
      <p className="text-center text-gray-300 max-w-2xl mx-auto mb-12">It's a beautiful place that we think has the same kind of romance that we want to build our lives on.</p>
      <p className="text-center text-gray-300 max-w-2xl mx-auto mb-12">We've listed some lodging options below, beyond just the Crescent, as well as some attractions. We can't wait to spend time with our loved ones, in such a charming little town.</p>

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
