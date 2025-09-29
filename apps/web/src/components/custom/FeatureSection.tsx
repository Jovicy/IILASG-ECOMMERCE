import React from "react";
import { sectionData } from "@/data/database";

const FeatureSection: React.FC = () => {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-20 bg-gray-50 text-gray-900">
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{sectionData.title}</h2>
        <p className="text-lg text-gray-600 mb-2">{sectionData.subtitle}</p>
        <p className="text-gray-700">{sectionData.description}</p>
      </div>

      {/* Features Grid */}
      <div className="grid gap-8 md:grid-cols-3">
        {sectionData.items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                <Icon size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeatureSection;
