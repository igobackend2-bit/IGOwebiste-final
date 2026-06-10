import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import {
  CheckCircle2,
  MessageSquare,
  Shield,
  Truck,
  Headphones,
  ArrowRight,
  ChevronRight,
  ArrowLeft,
  Minus,
  Plus,
  Zap,
  Package,
  TrendingUp,
  BadgeCheck
} from 'lucide-react';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { productDetailData, ProductDetail } from '@/data/productDetailData';
import { navLinks as siteNavLinks } from '@/data/siteData';

const fader: any = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const LOCAL_FALLBACK = '/assets/compressed/product/main-page-image/farm-equipment-.jpg';

const siteNavLinks_clean = siteNavLinks.map(l => ({ ...l, label: l.label.trim() }));
const productsNav = siteNavLinks_clean.find(l => l.label === 'Products')?.children || [];

// ── Category metadata (slug → display info) ──────────────────────────────────
const CATEGORY_META: Record<string, { label: string; cardImage: string; desc: string; alt?: string }> = {
  'agri-inputs': {
    label: 'Agri-Farming Solutions',
    cardImage: '/assets/product-images/new main image for product/agri inputs .jpg', alt: "Premium Seeds and Organic Farm Inputs Collection",
    desc: 'Premium seeds, organic inputs, and advanced propagation materials for high-yield farming.'
  },
  'structure': {
    label: 'Polyhouse & Engineering',
    cardImage: '/assets/product-images/new main image for product/polyhouse structure .jpg', alt: "Advanced Polyhouse Structure and Engineering Solutions",
    desc: 'Turn-key polyhouse structures, advanced cladding, and precision irrigation engineering.'
  },
  'automation': {
    label: 'Automation & Control',
    cardImage: '/assets/product-images/new main image for product/automation and cotroller .jpg', alt: "Smart Farming Automation and Precision Control Systems",
    desc: 'Smart IoT controllers, precision sensors, and automated fertigation systems.'
  },
  'horticulture': {
    label: 'Horticulture Solutions',
    cardImage: '/assets/product-images/new main image for product/horticulture catlog .png', alt: "Comprehensive Horticulture Farming Solutions",
    desc: 'Elite varieties of vegetables, flowers, fruits, and herbs for commercial cultivation.'
  },
  'digital': {
    label: 'Digital & IoT Services',
    cardImage: '/assets/product-images/new main image for product/digital agri and iot .jpg', alt: "Digital Agriculture and IoT Monitoring Services",
    desc: 'Data-driven farming with smart hardware nodes and integrated software dashboards.'
  },
  'specialized': {
    label: 'Post-Harvest & Specialized',
    cardImage: '/assets/product-images/new main image for product/post harvest and legacy .jpg', alt: "Post-Harvest Processing and Specialized Farm Equipment",
    desc: 'Solar cold storage, advanced sorting, and specialized aquaculture/livestock solutions.'
  }
};

// ── Subcategory metadata (slug → display info) ────────────────────────────────
const SUBCATEGORY_META: Record<string, { label: string; image: string; desc: string; alt?: string }> = {
  'seeds': {
    label: 'High-Yield Seeds',
    image: '/assets/product-images/product type new images/Soil Mix Media.jpg', alt: "High-Yielding Agricultural Seed Varieties",
    desc: 'Commercial grade hybrid and open-pollinated seeds optimized for precision farming and stable yields.'
  },
  'veg-seeds': {
    label: 'Vegetable Seeds',
    image: '/assets/product-images/product type new images/vegetables seeds/Tomato seeds.jpg', alt: "Premium Vegetable Seeds Assortment",
    desc: '20 premium vegetable seed varieties — from tomato and capsicum to leafy greens — for polyhouse and open-field cultivation.'
  },
  'fruit-seeds': {
    label: 'Fruit Seeds',
    image: '/assets/product-images/product type new images/fruit seeds/Mango seeds.jpg', alt: "Exotic and Commercial Fruit Seeds",
    desc: '7 high-value fruit seed varieties for orchard establishment, rootstock propagation, and commercial fruit production.'
  },
  'leafy-seeds': {
    label: 'Leafy & Herb Seeds',
    image: '/assets/product-images/product type new images/Leafy Seeds/Basil seeds.jpg', alt: "Nutritious Leafy Green and Herb Seeds",
    desc: '12 premium leafy and herb seed varieties for hydroponic systems, fresh herb markets, and specialty culinary supply chains.'
  },
  'media': {
    label: 'Growing Substrates',
    image: '/assets/product-images/product type new images/Grow Media.jpg', alt: "Professional Growing Substrates and Media",
    desc: 'Professional-grade media including buffered cocopeat, perlite, and custom nursery mixes.'
  },
  'nutrition': {
    label: 'Plant Nutrition',
    image: '/assets/product-images/product type new images/NPK Fertilizers.jpg', alt: "Essential Plant Nutrition and Fertilizers",
    desc: 'Water-soluble NPKs, nano-fertilizers, and organic growth promoters for targeted feeding.'
  },
  'protection': {
    label: 'Plant Protection',
    image: '/assets/product-images/product type new images/Bio Pesticides (Neem Oil, Trichoderma, Bacillus).png', alt: "Effective Plant Protection and Pest Control",
    desc: 'Biological and organic crop protection protocols for sustainable pest and disease management.'
  },
  'pgrs': {
    label: 'Growth Regulators',
    image: '/assets/product-images/product type new images/Amino Acid Nutrients.png', alt: "Advanced Plant Growth Regulators",
    desc: 'Advanced plant growth regulators for controlled bloom, fruit setting, and stress recovery.'
  },
  'mulching': {
    label: 'Mulching Systems',
    image: '/assets/product-images/product type new images/Silver Mulch.jpg', alt: "Agricultural Mulching Film Systems",
    desc: 'UV-stabilized silver-black mulch and weed mats to optimize moisture and eliminate competition.'
  },
  'frames': {
    label: 'Structural Engineering',
    image: '/assets/product-images/product type new images/gi pipes .jpg', alt: "Farm Infrastructure and Structural Engineering",
    desc: 'Hot-dip galvanized structural components and precision engineering for protected cultivation.'
  },
  'covering': {
    label: 'Greenhouse Covering',
    image: '/assets/product-images/product type new images/Polyhouse Sheets.png', alt: "Durable Greenhouse Covering Materials",
    desc: 'Multi-layer UV stabilized poly-films and specialized cladding for light and temperature management.'
  },
  'nets': {
    label: 'Specialized Netting',
    image: '/assets/product-images/product type new images/Shade Nets.png', alt: "Specialized Crop Protection Netting",
    desc: 'High-tenacity insect nets, shade nets, and anti-bird solutions for crop security.'
  },
  'ventilation': {
    label: 'Climate Control',
    image: '/assets/product-images/product type new images/Exhaust Fans.jpg', alt: "Polyhouse Climate Control Solutions",
    desc: 'Exhaust fans, cooling pads, and automated vent systems for precise internal climate management.'
  },
  'misting': {
    label: 'Misting & Humidity',
    image: '/assets/product-images/product type new images/Misting Systems.jpg', alt: "Agricultural Misting and Humidity Systems",
    desc: 'High-pressure fogging and misting systems to maintain ideal VPD and cooling levels.'
  },
  'plumbing': {
    label: 'Plumbing & Filtration',
    image: '/assets/product-images/product type new images/Irrigation Pipes (PVC, HDPE).jpg', alt: "Farm Irrigation Plumbing and Filtration",
    desc: 'Industrial-grade PVC/CPVC distribution lines and advanced filtration for irrigation longevity.'
  },
  'dosing': {
    label: 'Fertigation Systems',
    image: '/assets/product-images/product type new images/Fertigation Units.png', alt: "Automated Fertigation and Nutrient Delivery",
    desc: 'Automated fertilizer dosing and pH/EC control systems for repeatable crop performance.'
  },
  'controllers': {
    label: 'Smart Farm Control',
    image: '/assets/product-images/product type new images/Polyhouse Controllers.png', alt: "Intelligent Smart Farm Control Panels",
    desc: 'Centralized IGO-Link controllers for automated farm management via IoT and mobile platforms.'
  },
  'motors': {
    label: 'Precision Actuators',
    image: '/assets/product-images/product type new images/Motors & Actuators.jpg', alt: "Precision Vent and Farm Actuators",
    desc: 'Heavy-duty actuators and motors for automated vent and shade control in complex structures.'
  },
  'electrical': {
    label: 'Industrial Electrical',
    image: '/assets/product-images/product type new images/Control Panels.jpg', alt: "Industrial Electrical Panels for Agriculture",
    desc: 'Control panels, VFDs, and power management systems designed for harsh agricultural environments.'
  },
  'vegetables': {
    label: 'Vegetable Crops',
    image: '/assets/product-images/new main image for product/horticulture catlog .png', alt: "Commercial Vegetable Crop Production Solutions",
    desc: 'Elite varieties of commercial vegetables bred for market dominance and yield stability.'
  },
  'flowers': {
    label: 'Commercial Flowers',
    image: '/assets/product-images/product type new images/Organic Fertilizers.jpg', alt: "Commercial Floriculture and Flower Farming",
    desc: 'High-density floriculture inputs for the cut-flower and religious-garland industries.'
  },
  'fruits': {
    label: 'Ornamental & Fruits',
    image: '/assets/product-images/new main image for product/horticulture catlog .png', alt: "Ornamental and Commercial Fruit Cultivation",
    desc: 'Premium fruit saplings and exotic cultivars for commercial orchards and boutique farms.'
  },
  'herbs': {
    label: 'Aromatic & Herbs',
    image: '/assets/product-images/product type new images/Tulsi  seeds.jpg', alt: "Aromatic and Medicinal Herb Cultivation",
    desc: 'Medicinal plants and culinary herbs for pharmaceutical extraction and fresh markets.'
  },
  'hardware': {
    label: 'IoT Hardware Nodes',
    image: '/assets/product-images/product type new images/IoT Devices.jpg', alt: "IoT Hardware Sensor Nodes for Smart Farming",
    desc: 'Ruggedized sensor nodes and gateways for real-time field data telemetry.'
  },
  'software': {
    label: 'Digital Dashboards',
    image: '/assets/product-images/product type new images/Automation Dashboards.jpg', alt: "Digital Farm Management Analytics Dashboards",
    desc: 'Enterprise-grade agri-ERP and analytics software for farm management at scale.'
  },
  'services': {
    label: 'Precision Services',
    image: '/assets/product-images/product type new images/AI Crop Advisory.jpg', alt: "Precision Agriculture Consulting Services",
    desc: 'Satellite monitoring, soil mapping, and digital consultancy for data-driven decisions.'
  },
  'post-harvest': {
    label: 'Harvesting Tech',
    image: '/assets/product-images/product type new images/Solar Dryers.jpg', alt: "Modern Agricultural Harvesting Technology",
    desc: 'Advanced tools and systems for efficient harvest, storage, and cold-chain logistics.'
  },
  'aquaculture': {
    label: 'Aquaculture Systems',
    image: '/assets/product-images/product type new images/Fish Feed.jpg', alt: "Advanced Aquaculture and Fish Farming Systems",
    desc: 'Tier-1 nutrition and oxygenation systems for intensive fish and shrimp farming.'
  },
  'livestock': {
    label: 'Livestock Ecosystems',
    image: '/assets/product-images/product type new images/Goat Feed.png', alt: "Integrated Livestock and Dairy Ecosystems",
    desc: 'Professional-grade feed, housing, and veterinary care products for modern livestock.'
  }
};

// ── Individual product images ─────────────────────────────────────────────────
const PRODUCT_IMAGES: Record<string, { src: string; alt: string }> = {
  'vegetable-seeds-precision': { src: '/assets/product-images/product type new images/vegetables seeds/Tomato seeds.jpg', alt: "Precision Vegetable Seeds Collection" },
  'fruit-seeds-exotic': { src: '/assets/product-images/product type new images/fruit seeds/Papaya seeds.jpg', alt: "Exotic Fruit Seeds Assortment" },
  'flower-seeds-pro': { src: '/assets/product-images/product type new images/flowers seeds/flowers seeds', alt: "Professional Grade Flower Seeds" },
  'medicinal-seeds': { src: '/assets/product-images/product type new images/Tulsi  seeds.jpg', alt: "High Quality Medicinal Plant Seeds" },
  'herbs-seeds': { src: '/assets/product-images/product type new images/Leafy Seeds/Basil seeds.jpg', alt: "Fresh Culinary Herb Seeds" },
  // Vegetable Seeds — individual
  'seed-tomato': { src: '/assets/product-images/product type new images/vegetables seeds/Tomato seeds.jpg', alt: "Premium Tomato Seeds" },
  'seed-capsicum': { src: '/assets/product-images/product type new images/vegetables seeds/Capsicum seeds.jpg', alt: "Hybrid Capsicum Seeds" },
  'seed-cucumber': { src: '/assets/product-images/product type new images/vegetables seeds/Cucumber seeds.jpg', alt: "Fresh Cucumber Seeds" },
  'seed-brinjal': { src: '/assets/product-images/product type new images/vegetables seeds/Brinjal seeds.jpg', alt: "High-Yield Brinjal Seeds" },
  'seed-cabbage': { src: '/assets/product-images/product type new images/vegetables seeds/Cabbage seeds.jpg', alt: "Quality Cabbage Seeds" },
  'seed-cauliflower': { src: '/assets/product-images/product type new images/vegetables seeds/Cauliflower Seeds.jpg', alt: "Premium Cauliflower Seeds" },
  'seed-broccoli': { src: '/assets/product-images/product type new images/vegetables seeds/Broccoli seeds.jpg', alt: "Nutrient-rich Broccoli Seeds" },
  'seed-carrot': { src: '/assets/product-images/product type new images/vegetables seeds/Carrot seed.jpg', alt: "Fresh Carrot Seeds" },
  'seed-radish': { src: '/assets/product-images/product type new images/vegetables seeds/Radish seeds.jpg', alt: "Crisp Radish Seeds" },
  'seed-beetroot': { src: '/assets/product-images/product type new images/vegetables seeds/Beetroot seeds.jpg', alt: "Healthy Beetroot Seeds" },
  'seed-onion': { src: '/assets/product-images/product type new images/vegetables seeds/Onion seeds.jpg', alt: "High-Yield Onion Seeds" },
  'seed-peas': { src: '/assets/product-images/product type new images/vegetables seeds/Peas seeds.jpg', alt: "Sweet Garden Peas Seeds" },
  'seed-pumpkin': { src: '/assets/product-images/product type new images/vegetables seeds/Pumpkin seeds.jpg', alt: "Large Pumpkin Seeds" },
  'seed-bittergourd': { src: '/assets/product-images/product type new images/vegetables seeds/Bitter Gourd seeds.jpg', alt: "Healthy Bitter Gourd Seeds" },
  'seed-ridgegourd': { src: '/assets/product-images/product type new images/vegetables seeds/Ridge Gourd seeds.jpg', alt: "Premium Ridge Gourd Seeds" },
  'seed-bottlegourd': { src: '/assets/product-images/product type new images/vegetables seeds/Bottle gourd seeds.jpg', alt: "Fresh Bottle Gourd Seeds" },
  'seed-spinach': { src: '/assets/product-images/product type new images/vegetables seeds/Spinach seeds.jpg', alt: "Nutritious Spinach Seeds" },
  'seed-lettuce': { src: '/assets/product-images/product type new images/vegetables seeds/Lettuce seeds.jpg', alt: "Crisp Lettuce Seeds" },
  'seed-coriander': { src: '/assets/product-images/product type new images/vegetables seeds/Coriander seeds.jpg', alt: "Aromatic Coriander Seeds" },
  'seed-methi': { src: '/assets/product-images/product type new images/vegetables seeds/Methi seeds.jpg', alt: "Fresh Fenugreek (Methi) Seeds" },
  // Fruit Seeds — individual
  'seed-mango': { src: '/assets/product-images/product type new images/fruit seeds/Mango seeds.jpg', alt: "Premium Mango Tree Seeds" },
  'seed-papaya': { src: '/assets/product-images/product type new images/fruit seeds/Papaya seeds.jpg', alt: "Exotic Papaya Seeds" },
  'seed-guava': { src: '/assets/product-images/product type new images/fruit seeds/Guava seeds.jpg', alt: "High-Yield Guava Seeds" },
  'seed-lemon': { src: '/assets/product-images/product type new images/fruit seeds/Lemon seeds.jpg', alt: "Citrus Lemon Seeds" },
  'seed-pomegranate': { src: '/assets/product-images/product type new images/fruit seeds/Pomegranate seeds.jpg', alt: "Sweet Pomegranate Seeds" },
  'seed-chikoo': { src: '/assets/product-images/product type new images/fruit seeds/Chikoo  seeds.jpg', alt: "Sapodilla (Chikoo) Seeds" },
  'seed-custardapple': { src: '/assets/product-images/product type new images/fruit seeds/Custard Apple seeds.jpg', alt: "Delicious Custard Apple Seeds" },
  // Leafy & Herb Seeds — individual
  'seed-basil': { src: '/assets/product-images/product type new images/Leafy Seeds/Basil seeds.jpg', alt: "Aromatic Sweet Basil Seeds" },
  'seed-mint': { src: '/assets/product-images/product type new images/Leafy Seeds/Mint Seeds.jpg', alt: "Fresh Mint Seeds" },
  'seed-parsley': { src: '/assets/product-images/product type new images/Leafy Seeds/Parsley seeds.jpg', alt: "Culinary Parsley Seeds" },
  'seed-dill': { src: '/assets/product-images/product type new images/Leafy Seeds/Dill seeds.jpg', alt: "Aromatic Dill Seeds" },
  'seed-kale': { src: '/assets/product-images/product type new images/Leafy Seeds/Kale seeds.jpg', alt: "Nutrient-Dense Kale Seeds" },
  'seed-arugula': { src: '/assets/product-images/product type new images/Leafy Seeds/Arugula  seeds.jpg', alt: "Peppery Arugula Seeds" },
  'seed-amaranth': { src: '/assets/product-images/product type new images/Leafy Seeds/Amaranth seeds.jpg', alt: "Healthy Amaranth Seeds" },
  'seed-swisschard': { src: '/assets/product-images/product type new images/Leafy Seeds/Swiss Chard seeds.jpg', alt: "Vibrant Swiss Chard Seeds" },
  'seed-fenugreek-leafy': { src: '/assets/product-images/product type new images/Leafy Seeds/Fenugreek  seeds.jpg', alt: "Leafy Fenugreek Seeds" },
  'seed-mustardgreens': { src: '/assets/product-images/product type new images/Leafy Seeds/Mustard Greens  seeds.jpg', alt: "Spicy Mustard Greens Seeds" },
  'seed-lettuce-leafy': { src: '/assets/product-images/product type new images/Leafy Seeds/Lettuce seeds.jpg', alt: "Fresh Leafy Lettuce Seeds" },
  'seed-spinach-leafy': { src: '/assets/product-images/product type new images/Leafy Seeds/Spinach  seeds.jpg', alt: "Green Leafy Spinach Seeds" },

  'premium-cocopeat': { src: '/assets/product-images/product type new images/Grow Media.jpg', alt: "Premium Cocopeat Grow Media" },
  'expanded-perlite': { src: '/assets/product-images/product type new images/Perlite Coarse.jpg', alt: "Coarse Expanded Perlite for Soil Aeration" },
  'water-soluble-npk': { src: '/assets/product-images/product type new images/NPK Fertilizers.jpg', alt: "Water Soluble NPK Fertilizer Blend" },
  'nano-urea-liquid': { src: '/assets/product-images/product type new images/Liquid Fertilizers.jpg', alt: "Nano Urea Liquid Fertilizer" },
  'organic-ipm-kit': { src: '/assets/product-images/product type new images/Bio Pesticides (Neem Oil, Trichoderma, Bacillus).png', alt: "Organic Integrated Pest Management Kit" },
  'bio-fungicide-pro': { src: '/assets/product-images/product type new images/Bio Fungicides & Bio Nematicides.png', alt: "Professional Bio-Fungicide Solution" },
  'bloom-booster-nitro': { src: '/assets/product-images/product type new images/Amino Acid Nutrients.png', alt: "Nitrogen-Rich Bloom Booster Nutrient" },
  'silver-black-mulch': { src: '/assets/product-images/product type new images/Silver Mulch.jpg', alt: "Silver and Black Agricultural Mulch Film" },
  'gi-pipe-structure': { src: '/assets/product-images/product type new images/gi pipes .jpg', alt: "Galvanized Iron Pipes for Polyhouse Structures" },
  'polyhouse-polyethylene': { src: '/assets/product-images/product type new images/Polyhouse Sheets.png', alt: "UV Stabilized Polyethylene Polyhouse Sheets" },
  'insect-net-uv-pro': { src: '/assets/product-images/product type new images/Insect Nets.png', alt: "UV Protected Agricultural Insect Netting" },
  'axial-exhaust-fan-50': { src: '/assets/product-images/product type new images/Exhaust Fans.jpg', alt: "Heavy Duty 50-inch Axial Exhaust Fan" },
  'cooling-pad-cellulose': { src: '/assets/product-images/product type new images/Cooling Pads.jpg', alt: "High-Efficiency Cellulose Cooling Pads" },
  'misting-nozzle-kit': { src: '/assets/product-images/product type new images/Misting Systems.jpg', alt: "Professional Misting Nozzle System Kit" },
  'disc-filter-industrial': { src: '/assets/product-images/product type new images/Valves.jpg', alt: "Industrial Grade Agricultural Disc Filter" },
  'drip-line-pressure-comp': { src: '/assets/product-images/product type new images/Drip Irrigation Systems.jpg', alt: "Pressure Compensating Drip Irrigation Line" },
  'fertigation-machine-classic': { src: '/assets/product-images/product type new images/Fertigation Units.png', alt: "Classic Automated Fertigation Unit" },
  'igolink-smarthub': { src: '/assets/product-images/product type new images/Polyhouse Controllers.png', alt: "IgoLink Smart Polyhouse Controller Hub" },
  'vent-actuator-ac': { src: '/assets/product-images/product type new images/Vent Motors.jpg', alt: "AC Powered Vent Motor Actuator" },
  'farm-vfd-panel': { src: '/assets/product-images/product type new images/Control Panels.jpg', alt: "Variable Frequency Drive Farm Control Panel" },
  'capsicum-seeds-hybrid': { src: '/assets/product-images/new main image for product/horticulture catlog .png', alt: "Premium Hybrid Capsicum Seeds" },
  'grafted-fruit-plants-combo': { src: '/assets/product-images/new main image for product/horticulture catlog .png', alt: "Grafted Fruit Plants Combo Pack" },
  'marigold-pro-tray': { src: '/assets/product-images/product type new images/Organic Fertilizers.jpg', alt: "Professional Marigold Seedling Plug Tray" },
  'fresh-herb-starter-kit': { src: '/assets/product-images/product type new images/Tulsi  seeds.jpg', alt: "Fresh Culinary Herb Starter Growing Kit" },
  'iot-soil-node-v2': { src: '/assets/product-images/product type new images/Sensors (Temp, Humidity, Soil, pH, EC).jpg', alt: "IoT Enabled Soil Sensor Node v2" },
  'igo-erp-farm-pro': { src: '/assets/product-images/product type new images/Automation Dashboards.jpg', alt: "Igo ERP Pro Farm Management Dashboard" },
  'satellite-yield-monitor': { src: '/assets/product-images/product type new images/Yield Prediction Tools in india.png', alt: "Satellite-based Crop Yield Prediction Tool" },
  'paddle-wheel-aerator-pro': { src: '/assets/product-images/product type new images/Aerators.jpg', alt: "Professional Aquaculture Paddle Wheel Aerator" },
  'floating-fish-feed-premium': { src: '/assets/product-images/product type new images/Fish Feed.jpg', alt: "Premium Floating Fish Feed Pellets" },
  'cattle-feed-premium': { src: '/assets/product-images/product type new images/Cattle Feed.png', alt: "Nutrient-Rich Premium Cattle Feed" },
  'solar-tunnel-dryer-igo': { src: '/assets/product-images/product type new images/Solar Dryers.jpg', alt: "Igo Solar Tunnel Dryer for Agricultural Produce" },
  'plastic-harvesting-crates': { src: '/assets/product-images/product type new images/Crates & Bins.jpg', alt: "Durable Plastic Agricultural Harvesting Crates" },
  // Legacy IDs
  'vegetable-seeds': { src: '/assets/product-images/product type new images/Soil Mix Media.jpg', alt: "Assorted Vegetable Seeds Collection" },
  'fruit-plants': { src: '/assets/product-images/product type new images/Rubber Plant seeds.jpg', alt: "High-Yielding Fruit Plants Collection" },
  'flower-seeds': { src: '/assets/product-images/product type new images/Organic Fertilizers.jpg', alt: "Beautiful Flower Seeds Assortment" },
  'medicinal-plants': { src: '/assets/product-images/product type new images/Tulsi  seeds.jpg', alt: "Therapeutic Medicinal Plants" },
  'npk': { src: '/assets/product-images/product type new images/NPK Fertilizers.jpg', alt: "NPK Essential Plant Nutrients" },
  'organic': { src: '/assets/product-images/product type new images/Organic Fertilizers.jpg', alt: "100% Organic Plant Fertilizers" },
  'bio': { src: '/assets/product-images/product type new images/Azospirillum.png', alt: "Biological Soil Inoculants and Fertilizers" },
  'liquid-fertilizers': { src: '/assets/product-images/product type new images/Liquid Fertilizers.jpg', alt: "Fast-Acting Liquid Plant Fertilizers" },
  'micronutrients': { src: '/assets/product-images/product type new images/Micronutrients (Fe, Zn, Mn, B, Cu).png', alt: "Essential Agricultural Micronutrient Blend" },
  'insecticides': { src: '/assets/product-images/product type new images/Insecticides.png', alt: "Effective Crop Protection Insecticides" },
  'fungicides': { src: '/assets/product-images/product type new images/Fungicides.png', alt: "Agricultural Disease Control Fungicides" },
  'herbicides': { src: '/assets/product-images/product type new images/Herbicides.png', alt: "Effective Agricultural Weed Control Herbicides" },
  'biological': { src: '/assets/product-images/product type new images/Bio Pesticides (Neem Oil, Trichoderma, Bacillus).png', alt: "Biological Pest and Disease Control Agents" },
  'seaweed': { src: '/assets/product-images/product type new images/Seaweed Extract.png', alt: "Natural Seaweed Extract Plant Tonic" },
  'liquid': { src: '/assets/product-images/product type new images/Water Soluble Fertilizers.jpg', alt: "Soluble Liquid Nutritional Supplements" },
  'fish-feed': { src: '/assets/product-images/product type new images/Fish Feed.jpg', alt: "High-Protein Aquaculture Fish Feed" },
  'aerators': { src: '/assets/product-images/product type new images/Aerators.jpg', alt: "Pond Water Aeration Systems" },
  'biofloc-tanks': { src: '/assets/product-images/product type new images/Biofloc Tanks.jpg', alt: "Complete Biofloc Aquaculture Tank Setup" },
  'pond-liners': { src: '/assets/product-images/product type new images/Pond Liners.jpg', alt: "Durable Aquaculture Pond Liner Sheets" },
  'water-testing-kits': { src: '/assets/product-images/product type new images/Water Testing Kits.jpg', alt: "Comprehensive Aquaculture Water Quality Testing Kits" },
  'fish-medicines': { src: '/assets/product-images/product type new images/Fish Medicines.jpg', alt: "Veterinary Fish Medicines and Treatments" },
  'goat-feed': { src: '/assets/product-images/product type new images/Goat Feed.jpg', alt: "Nutritious Goat and Sheep Feed Supplements" },
  'cattle-feed': { src: '/assets/product-images/product type new images/Cattle Feed.png', alt: "High-Energy Cattle Feed Formulation" },
  'mineral-mixtures': { src: '/assets/product-images/product type new images/Mineral Mixtures.png', alt: "Essential Livestock Mineral and Vitamin Mixtures" },
  'livestock-medicines': { src: '/assets/product-images/product type new images/Veterinary Medicines.png', alt: "Veterinary Livestock Healthcare Medicines" },
  'livestock-equipment': { src: '/assets/product-images/product type new images/Livestock Equipment.png', alt: "Durable Farm and Livestock Equipment" },
  'polyhouse-sheets': { src: '/assets/product-images/product type new images/Polyhouse Sheets.png', alt: "Greenhouse and Polyhouse Covering Sheets" },
  'shade-nets': { src: '/assets/product-images/product type new images/Shade Nets.png', alt: "Agricultural Shade Nets for Climate Control" },
  'insect-nets': { src: '/assets/product-images/product type new images/Insect Nets.png', alt: "Protective Crop Insect Nets" },
  'gi-pipes': { src: '/assets/product-images/product type new images/gi pipes .jpg', alt: "Structural GI Pipes for Greenhouses" },
  'nft-channels': { src: '/assets/product-images/product type new images/NFT Channels.png', alt: "NFT Hydroponic Growing Channels" },
  'net-pots': { src: '/assets/product-images/product type new images/Net Pots.jpg', alt: "Hydroponic Net Pots and Cups" },
  'hydroponic-nutrients': { src: '/assets/product-images/product type new images/Hydroponic Nutrients.png', alt: "Complete Hydroponic Nutrient Solutions" },
  'grow-lights': { src: '/assets/product-images/product type new images/IoT Devices.jpg', alt: "LED Grow Lights for Indoor Farming" },
  'water-pumps': { src: '/assets/product-images/product type new images/pumps .jpg', alt: "Agricultural Irrigation Water Pumps" },
  'drip-irrigation-systems': { src: '/assets/product-images/product type new images/Drip Irrigation Systems.jpg', alt: "Efficient Drip Irrigation System Components" },
  'sprinklers': { src: '/assets/product-images/product type new images/Sprinklers.jpg', alt: "Agricultural Overhead Sprinkler Systems" },
  'irrigation-pipes': { src: '/assets/product-images/product type new images/Irrigation Pipes (PVC, HDPE).jpg', alt: "Durable PVC and HDPE Irrigation Pipes" },
  'solar-dryers': { src: '/assets/product-images/product type new images/Solar Dryers.jpg', alt: "Solar Powered Crop Drying Solutions" },
  'solar-pumps': { src: '/assets/product-images/product type new images/Solar Pumps.jpg', alt: "Solar Powered Irrigation Water Pumps" },
  'solar-fencing-systems': { src: '/assets/product-images/product type new images/Solar Fencing Systems.jpg', alt: "Solar Agricultural Perimeter Fencing Systems" },
  'soil-nutrient-scanner': { src: '/assets/product-images/product type new images/Water Testing Kits.jpg', alt: "Digital Soil Nutrient and Moisture Scanner" },
  'smart-farm-surveillance': { src: '/assets/product-images/product type new images/IoT Sensor Systems.jpg', alt: "Smart Agricultural IoT Surveillance System" },
  'igo-erp-pro': { src: '/assets/product-images/product type new images/Automation Dashboards.jpg', alt: "Advanced Igo ERP Farm Management Software" },
  'vacuum-packer-pro': { src: '/assets/product-images/product type new images/Vacuum Packing Machines.jpg', alt: "Professional Vacuum Packing Machine for Produce" },
  'cold-chain-iot': { src: '/assets/product-images/product type new images/Cold Storage Units.jpg', alt: "IoT Managed Cold Storage Unit" },
  'hybrid-seed-master-kit': { src: '/assets/product-images/product type new images/Soil Mix Media.jpg', alt: "Comprehensive Hybrid Seed Master Kit" },
};

// ── Shared CTA Strip ──────────────────────────────────────────────────────────
const CTAStrip: React.FC<{ label: string }> = ({ label }) => (
  <section className="py-24 bg-agri-green-800 text-white overflow-hidden relative">
    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
    <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
      <div className="max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-serif mb-4 leading-tight">
          Need volume pricing for {label}?
        </h2>
        <p className="text-white/60 text-lg font-light">
          Connect with our institutional sales desk for GST billing, formal quotes, and logistics scheduling across India.
        </p>
      </div>
      <Link
        to="/contact?subject=Institutional%20Sales"
        className="group shrink-0 inline-flex items-center gap-3 px-10 py-5 bg-white text-agri-green-800 text-[11px] font-bold rounded-full hover:bg-agri-gold-500 hover:text-white transition-all uppercase tracking-widest shadow-2xl"
      >
        Institutional Sales Desk
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  </section>
);

// ══════════════════════════════════════════════════════════════════════════════
// CategoryPage — /products/:category
// Shows the category hero and a grid of all subcategory cards
// ══════════════════════════════════════════════════════════════════════════════
const CategoryPage: React.FC<{ category: string }> = ({ category }) => {
  const meta = CATEGORY_META[category];
  const catItem = productsNav.find((c: any) => c.href === `/products/${category}`);

  if (!meta || !catItem) return <Navigate to="/products" />;

  const subcategories: any[] = (catItem as any).children || [];
  const totalProducts = productDetailData.filter(p => p.category === category).length;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.igoagritechfarms.com/' },
      { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://www.igoagritechfarms.com/products' },
      { '@type': 'ListItem', position: 3, name: meta.label, item: `https://www.igoagritechfarms.com/products/${category}` }
    ]
  };

  return (
    <div className="bg-white min-h-screen selection:bg-agri-green-50 selection:text-agri-green-800">
      <SEO
        title={`${meta.label} | Product Catalog — IGO Agritech Farms`}
        description={`${meta.desc} Shop our complete ${meta.label} range with institutional pricing and pan-India delivery.`}
        keywords={`${meta.label}, agri products India, ${category}, IGO Agritech`}
        url={`/products/${category}`}
        image={meta.cardImage}
        jsonLd={jsonLd}
      />

      {/* ── Header section ── */}
      <section className="bg-white pt-28 sm:pt-36 pb-16">
        <div className="container mx-auto px-6">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-black/25 mb-14 overflow-x-auto no-scrollbar whitespace-nowrap">
            <Link to="/" className="hover:text-agri-green-800 transition-colors">Home</Link>
            <div className="w-5 h-px bg-black/10" />
            <Link to="/products" className="hover:text-agri-green-800 transition-colors">Products</Link>
            <div className="w-5 h-px bg-black/10" />
            <span className="text-agri-gold-600">{meta.label}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

            {/* Left — Title block */}
            <motion.div
              className="lg:w-1/2"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            >
              <motion.div variants={fader} className="flex items-center gap-3 mb-6">
                <div className="w-10 h-px bg-agri-gold-500/50" />
                <span className="text-agri-gold-500 text-[10px] font-black uppercase tracking-[0.4em]">
                  IGO Product Division
                </span>
              </motion.div>

              <motion.h1
                variants={fader}
                className="text-[4rem] sm:text-[5.5rem] md:text-[7rem] font-serif text-agri-green-800 leading-[0.88] tracking-tight mb-8"
              >
                {meta.label}
              </motion.h1>

              <motion.p
                variants={fader}
                className="text-xl text-black/45 font-light leading-relaxed italic border-l-4 border-agri-gold-500/20 pl-6 mb-10"
              >
                {meta.desc}
              </motion.p>

              <motion.div variants={fader} className="flex flex-wrap items-center gap-8">
                <div className="flex flex-col">
                  <span className="text-4xl font-serif text-agri-green-800">{subcategories.length}</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-black/30 mt-1">Subcategories</span>
                </div>
                <div className="w-px h-12 bg-black/5" />
                <div className="flex flex-col">
                  <span className="text-4xl font-serif text-agri-green-800">{totalProducts > 0 ? totalProducts : '—'}</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-black/30 mt-1">Products Listed</span>
                </div>
                <div className="w-px h-12 bg-black/5" />
                <Link
                  to="/contact?subject=Catalog"
                  className="flex items-center gap-2 text-agri-gold-500 text-[10px] font-black uppercase tracking-widest group"
                >
                  Get Catalog
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right — Hero Image */}
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border border-black/5 group">
                <OptimizedImage
                  src={meta.cardImage}
                  alt={meta.alt || meta.label}
                  loading="eager"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-agri-green-800/20" />
                <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between">
                  <div className="bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full flex items-center gap-2 shadow-xl border border-black/5">
                    <div className="w-2 h-2 rounded-full bg-agri-gold-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-agri-green-800">Active Division</span>
                  </div>
                  <div className="bg-agri-gold-500 text-white px-4 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                    ISO 9001
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>



      {/* ── Subcategory Grid ── */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between mb-16 gap-8">
            <div>
              <span className="text-[10px] font-black text-agri-gold-500 uppercase tracking-[0.4em] mb-3 block">
                Browse by Type
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-agri-green-800 leading-[0.95]">
                Select a Category
              </h2>
            </div>
            <span className="hidden md:block text-[7rem] font-serif text-black/[0.04] leading-none select-none pointer-events-none">
              {subcategories.length.toString().padStart(2, '0')}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {subcategories.map((sub: any, i: number) => {
              const slug = sub.href.split('/').pop() || '';
              const subMeta = SUBCATEGORY_META[slug];
              const img = subMeta?.image || meta.cardImage;
              const desc = subMeta?.desc || 'Professional-grade agricultural inputs for modern farming.';
              const productCount = productDetailData.filter(p => p.category === category && p.subcategory === slug).length;

              return (
                <motion.div
                  key={sub.href}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={sub.href}
                    className="group flex flex-col rounded-[2rem] overflow-hidden bg-white border border-black/[0.06] hover:border-agri-gold-500/40 hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.15)] transition-all duration-700 h-full"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
                      <OptimizedImage
                        src={img}
                        alt={subMeta?.alt || sub.label}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute top-4 right-4">
                        <span className="bg-agri-gold-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                          {productCount > 0 ? `${productCount} Products` : 'Premium'}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-6">
                        <span className="text-5xl font-serif text-white/15 leading-none select-none">
                          {(i + 1).toString().padStart(2, '0')}
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-8 flex flex-col flex-1">
                      <h3 className="text-2xl font-serif text-agri-green-800 mb-3 group-hover:text-agri-gold-600 transition-colors duration-500 leading-tight">
                        {sub.label}
                      </h3>
                      <p className="text-sm text-black/40 font-light leading-relaxed mb-7 flex-1 line-clamp-2">
                        {desc}
                      </p>
                      <div className="flex items-center gap-2 text-agri-gold-500 text-[10px] font-black uppercase tracking-[0.3em] group-hover:gap-4 transition-all duration-500">
                        Explore Range
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTAStrip label={meta.label} />
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SubcategoryPage — /products/:category/:subcategory
// Shows the subcategory hero, sibling pill nav, and products grid
// ══════════════════════════════════════════════════════════════════════════════
const SubcategoryPage: React.FC<{ category: string; subcategory: string }> = ({ category, subcategory }) => {
  const catMeta = CATEGORY_META[category];
  const subMeta = SUBCATEGORY_META[subcategory];
  const catItem = productsNav.find((c: any) => c.href === `/products/${category}`);
  const allSiblings: any[] = (catItem as any)?.children || [];
  const subcategoryNode = allSiblings.find((s: any) => s.href === `/products/${category}/${subcategory}`);
  const products = productDetailData.filter(p => p.category === category && p.subcategory === subcategory);

  if (!catMeta || !catItem) return <Navigate to="/products" />;

  const activeMeta = {
    label: subMeta?.label || (subcategoryNode as any)?.label || subcategory,
    image: subMeta?.image || catMeta.cardImage,
    desc: subMeta?.desc || catMeta.desc,
    alt: subMeta?.alt || catMeta.alt
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.igoagritechfarms.com/' },
      { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://www.igoagritechfarms.com/products' },
      { '@type': 'ListItem', position: 3, name: catMeta.label, item: `https://www.igoagritechfarms.com/products/${category}` },
      { '@type': 'ListItem', position: 4, name: activeMeta.label, item: `https://www.igoagritechfarms.com/products/${category}/${subcategory}` }
    ]
  };

  return (
    <div className="bg-white min-h-screen selection:bg-agri-green-50 selection:text-agri-green-800">
      <SEO
        title={`${activeMeta.label} | ${catMeta.label} — IGO Agritech Farms`}
        description={`${activeMeta.desc} Buy ${activeMeta.label} from IGO Agritech Farms. Institutional pricing available.`}
        keywords={`${activeMeta.label}, ${catMeta.label}, agri products, IGO Agritech`}
        url={`/products/${category}/${subcategory}`}
        image={activeMeta.image}
        jsonLd={jsonLd}
      />

      {/* ── Hero ── */}
      <section className="bg-white pt-28 sm:pt-36 pb-12">
        <div className="container mx-auto px-6">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-black/25 mb-14 overflow-x-auto no-scrollbar whitespace-nowrap">
            <Link to="/" className="hover:text-agri-green-800 transition-colors">Home</Link>
            <div className="w-5 h-px bg-black/10" />
            <Link to="/products" className="hover:text-agri-green-800 transition-colors">Products</Link>
            <div className="w-5 h-px bg-black/10" />
            <Link to={`/products/${category}`} className="hover:text-agri-green-800 transition-colors">{catMeta.label}</Link>
            <div className="w-5 h-px bg-black/10" />
            <span className="text-agri-gold-600">{activeMeta.label}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-16 items-center">

            {/* Left — Subcategory image */}
            <motion.div
              className="lg:w-[42%]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border border-black/5 group">
                <OptimizedImage
                  src={activeMeta.image}
                  alt={activeMeta.alt || activeMeta.label}
                  loading="eager"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute top-6 left-6">
                  <div className="bg-white/95 backdrop-blur-md px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-agri-green-800 shadow-xl border border-black/5 flex items-center gap-2">
                    <BadgeCheck className="w-3.5 h-3.5 text-agri-gold-600" />
                    IGO Subcategory
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right — Info */}
            <div className="lg:w-[58%]">
              <motion.div
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.12 } } }}
              >
                <motion.div variants={fader} className="flex items-center gap-3 text-agri-gold-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                  <div className="w-8 h-px bg-agri-gold-500/40" />
                  {catMeta.label}
                </motion.div>

                <motion.h1
                  variants={fader}
                  className="text-5xl md:text-7xl font-serif text-agri-green-800 mb-6 leading-[0.9] tracking-tight"
                >
                  {activeMeta.label}
                </motion.h1>

                <motion.p
                  variants={fader}
                  className="text-xl text-black/45 font-light leading-relaxed italic border-l-4 border-agri-gold-500/20 pl-6 mb-10"
                >
                  {activeMeta.desc}
                </motion.p>

                <motion.div variants={fader} className="flex flex-wrap items-center gap-6">
                  <div className="bg-agri-earth-15 px-8 py-5 rounded-2xl inline-flex items-center gap-6 border border-black/5">
                    <div>
                      <span className="text-3xl font-serif text-agri-green-800">{products.length > 0 ? products.length : '—'}</span>
                      <span className="text-[9px] font-black uppercase tracking-widest text-black/30 block mt-0.5">Products</span>
                    </div>
                    <div className="w-px h-10 bg-black/5" />
                    <div>
                      <span className="text-[9px] font-bold text-agri-gold-600 uppercase tracking-widest block mb-0.5">Status</span>
                      <span className="text-xs font-black text-agri-green-800 uppercase tracking-widest">Active</span>
                    </div>
                  </div>
                  <Link
                    to={`/products/${category}`}
                    className="flex items-center gap-2 text-black/30 text-[10px] font-black uppercase tracking-widest hover:text-agri-green-800 transition-colors group"
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    All {catMeta.label}
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>



      {/* ── Products Grid or Empty State ── */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          {products.length > 0 ? (
            <>
              <div className="flex items-end justify-between mb-14 gap-8">
                <div>
                  <span className="text-[10px] font-black text-agri-gold-500 uppercase tracking-[0.3em] mb-3 block">
                    Institutional Catalog
                  </span>
                  <h2 className="text-3xl md:text-5xl font-serif text-agri-green-800 leading-[0.95]">
                    {activeMeta.label} Products
                  </h2>
                </div>
                <span className="hidden md:block text-[6rem] font-serif text-black/[0.04] leading-none select-none pointer-events-none">
                  {products.length.toString().padStart(2, '0')}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={`/products/${category}/${subcategory}/${product.id}`}
                      className="group flex flex-col bg-white rounded-[2rem] overflow-hidden border border-black/[0.06] shadow-sm hover:shadow-[0_25px_60px_-10px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1.5 h-full"
                    >
                      {/* Image */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
                        <OptimizedImage
                          src={PRODUCT_IMAGES[product.id]?.src || activeMeta.image}
                          alt={PRODUCT_IMAGES[product.id]?.alt || (product as any).alt || product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          fallbackSrc={catMeta.cardImage}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[9px] font-black uppercase tracking-widest text-agri-green-800 shadow-sm border border-black/5">
                            {activeMeta.label}
                          </span>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-7 flex flex-col flex-1">
                        <div className="flex items-center gap-2 text-agri-gold-500 font-bold text-[9px] uppercase tracking-widest mb-3">
                          <TrendingUp className="w-3 h-3" />
                          Institutional Grade
                        </div>
                        <h3 className="text-xl font-serif text-agri-green-800 mb-2.5 leading-snug group-hover:text-agri-gold-500 transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-xs text-black/35 leading-relaxed line-clamp-2 mb-6 flex-1 italic font-light">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between mt-auto pt-5 border-t border-black/[0.05]">
                          <div>
                            <span className="text-[9px] font-bold text-black/25 uppercase tracking-widest block mb-0.5">From</span>
                            <span className="text-xl font-black text-agri-green-800">₹{product.pricing.retail.toLocaleString()}</span>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-slate-50 group-hover:bg-agri-green-800 flex items-center justify-center transition-colors duration-500 shadow-sm">
                            <ArrowRight className="w-5 h-5 text-agri-green-800 group-hover:text-white transition-colors duration-500" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            /* ── Empty State ── */
            <motion.div
              className="text-center py-32"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <div className="w-24 h-24 rounded-[2rem] bg-agri-earth-15 flex items-center justify-center mx-auto mb-8 shadow-inner">
                <Package className="w-10 h-10 text-agri-gold-500" />
              </div>
              <h3 className="text-3xl md:text-4xl font-serif text-agri-green-800 mb-4">
                Premium Range Available
              </h3>
              <p className="text-black/40 font-light text-lg mb-10 max-w-md mx-auto">
                Our <span className="text-agri-green-800 font-medium">{activeMeta.label}</span> catalog is available on institutional request. Contact our sales team for full product sheets and pricing.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to={`/contact?subject=Catalog%20Request%20–%20${encodeURIComponent(activeMeta.label)}`}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-agri-green-800 text-white rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-agri-gold-500 transition-all shadow-xl"
                >
                  Request Catalog <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to={`/products/${category}`}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-agri-green-800 text-agri-green-800 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-agri-green-50 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to {catMeta.label}
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <CTAStrip label={activeMeta.label} />
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// DetailView — /products/:category/:subcategory/:productSlug
// Full product detail page (unchanged from original)
// ══════════════════════════════════════════════════════════════════════════════
const DetailView: React.FC<{ product: ProductDetail; category: string }> = ({ product, category }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'description' | 'howToUse' | 'specifications'>('description');
  const [quantity, setQuantity] = useState(1);
  const [selectedPackSize, setSelectedPackSize] = useState(product.packSizes[0]);
  const [selectedPriceTier, setSelectedPriceTier] = useState<'retail' | 'wholesale' | 'bulk'>('retail');
  const meta = CATEGORY_META[category];

  const productImg = PRODUCT_IMAGES[product.id]?.src || meta?.cardImage || LOCAL_FALLBACK;
  const [imgUrl, setImgUrl] = useState(productImg);
  const [imgFallbackStage, setImgFallbackStage] = useState(0);

  useEffect(() => {
    setImgUrl(PRODUCT_IMAGES[product.id]?.src || meta?.cardImage || LOCAL_FALLBACK);
    setImgFallbackStage(0);
  }, [product.id, category, meta?.cardImage]);

  const onImageError = () => {
    if (imgFallbackStage === 0) {
      setImgUrl(meta?.cardImage || LOCAL_FALLBACK);
      setImgFallbackStage(1);
    } else if (imgFallbackStage === 1) {
      setImgUrl(LOCAL_FALLBACK);
      setImgFallbackStage(2);
    }
  };

  const handleEnquire = (subject?: string) => {
    const s = subject || `Enquiry: ${product.name}`;
    navigate(`/contact?subject=${encodeURIComponent(s)}`);
  };

  const priceTiers = [
    { id: 'retail' as const, label: 'Retail Price', value: product.pricing.retail },
    { id: 'wholesale' as const, label: 'Wholesale (Min 50)', value: product.pricing.wholesale },
    { id: 'bulk' as const, label: 'Bulk Institutional', value: product.pricing.bulk }
  ];

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: imgUrl.startsWith('/') ? `https://www.igoagritechfarms.com${imgUrl}` : imgUrl,
    brand: { '@type': 'Brand', name: 'IGO Agritech Farms' },
    category: product.categoryName,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: product.pricing.retail,
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'IGO Agritech Farms' }
    }
  };

  const productBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.igoagritechfarms.com/' },
      { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://www.igoagritechfarms.com/products' },
      { '@type': 'ListItem', position: 3, name: meta?.label || category, item: `https://www.igoagritechfarms.com/products/${category}` },
      { '@type': 'ListItem', position: 4, name: product.name, item: `https://www.igoagritechfarms.com/products/${category}/${product.id}` }
    ]
  };

  return (
    <div className="bg-white min-h-screen pt-24 pb-20 selection:bg-agri-green-50 selection:text-agri-green-800">
      <SEO
        title={product.name}
        description={`Buy ${product.name} from IGO Agritech Farms. ${product.description.slice(0, 100)} Starting from ₹${product.pricing.retail.toLocaleString()}. Pan-India delivery.`}
        keywords={`${product.name}, ${product.categoryName}, buy ${product.categoryName.toLowerCase()}, IGO Agritech Farms, agricultural products`}
        url={`/products/${category}/${product.id}`}
        image={imgUrl.startsWith('/') ? imgUrl : undefined}
        jsonLd={{ '@context': 'https://schema.org', '@graph': [productBreadcrumb, productSchema] }}
      />

      <div className="container mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.25em] text-black/30 mb-16 overflow-x-auto no-scrollbar whitespace-nowrap">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <div className="w-6 h-px bg-black/10" />
          <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
          <div className="w-6 h-px bg-black/10" />
          <Link to={`/products/${category}`} className="hover:text-primary transition-colors">{meta?.label || category}</Link>
          <div className="w-6 h-px bg-black/10" />
          <span className="text-agri-gold-600 truncate">{product.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-20">
          {/* LEFT — Image + Trust Badges */}
          <div className="lg:w-[45%]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-slate-100 shadow-2xl border border-black/5 group"
            >
              <OptimizedImage
                src={imgUrl}
                alt={product.name}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={onImageError}
                fallbackSrc={meta?.cardImage || LOCAL_FALLBACK}
              />
              <div className="absolute top-8 left-8">
                <div className="bg-white/95 backdrop-blur-md px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-agri-green-800 shadow-xl border border-black/5 flex items-center gap-2">
                  <BadgeCheck className="w-3.5 h-3.5 text-agri-gold-600" /> Premium Institutional Grade
                </div>
              </div>
            </motion.div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-6 mt-10">
              {[
                { icon: Shield, label: 'Quality Assured' },
                { icon: Headphones, label: 'Expert Support' },
                { icon: Truck, label: 'Pan India Express' }
              ].map((badge, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="flex flex-col items-center text-center p-5 rounded-3xl bg-slate-50 border border-black/[0.03] hover:border-agri-gold-500/20 transition-colors"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 border border-black/[0.02]">
                    <badge.icon className="w-5 h-5 text-agri-gold-500" />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-black/50 leading-tight">{badge.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT — Info */}
          <div className="lg:w-[55%] lg:pt-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className="flex items-center gap-3 text-agri-gold-500 font-bold text-[10px] uppercase tracking-[0.3em] mb-6">
                <div className="w-10 h-px bg-agri-gold-500/40" />
                {product.categoryName}
              </div>
              <h1 className="text-5xl md:text-7xl font-serif text-agri-green-800 mb-6 tracking-tight leading-[0.95]">
                {product.name}
              </h1>
              <p className="text-xl text-black/60 font-light leading-relaxed mb-10 border-l-4 border-agri-gold-500/20 pl-6 italic">
                {product.description}
              </p>

              {/* Pack Size selector */}
              <div className="mb-8">
                <span className="text-[10px] font-bold text-black/30 uppercase tracking-[0.2em] block mb-4">Pack Size</span>
                <div className="flex flex-wrap gap-3">
                  {product.packSizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedPackSize(size)}
                      className={`px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${selectedPackSize === size
                        ? 'bg-agri-green-800 text-white border-agri-green-800 shadow-md'
                        : 'bg-white text-black/50 border-black/10 hover:border-agri-green-800 hover:text-agri-green-800'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Card */}
              <div className="bg-agri-earth-15 p-8 rounded-[2rem] border border-black/5 mb-12 shadow-inner">
                <div className="flex flex-wrap items-center justify-between gap-8">
                  <div>
                    <span className="text-[10px] font-bold text-black/30 uppercase tracking-[0.2em] block mb-2">Institutional Pricing</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black text-agri-green-800">
                        ₹{selectedPackSize === product.packSizes[0]
                          ? product.pricing[selectedPriceTier].toLocaleString()
                          : (product.pricing[selectedPriceTier] * 1.5).toLocaleString()}
                      </span>
                      <span className="text-black/30 text-sm font-medium">/ unit</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {priceTiers.map(tier => (
                      <button
                        key={tier.id}
                        onClick={() => setSelectedPriceTier(tier.id)}
                        className={`px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${selectedPriceTier === tier.id
                          ? 'bg-agri-green-800 text-white border-agri-green-800 shadow-lg'
                          : 'bg-white text-black/40 border-black/5 hover:border-agri-green-800 hover:text-agri-green-800'
                          }`}
                      >
                        {tier.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="mt-12">
                <div className="flex border-b border-black/5 mb-10 overflow-x-auto no-scrollbar">
                  {[
                    { id: 'description', label: 'Overview' },
                    { id: 'specifications', label: 'Technical Details' },
                    { id: 'howToUse', label: 'Usage Protocol' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`px-8 py-5 text-[11px] font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all relative ${activeTab === tab.id ? 'text-agri-green-800' : 'text-black/30 hover:text-black/60'
                        }`}
                    >
                      {tab.label}
                      {activeTab === tab.id && (
                        <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-agri-gold-500" />
                      )}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="min-h-[250px] leading-relaxed"
                  >
                    {activeTab === 'description' && (
                      <div className="text-lg text-black/70 font-light space-y-6">
                        <p>{product.tabDescription}</p>
                        <div className="grid sm:grid-cols-2 gap-4 mt-8">
                          {product.features.map((f, i) => (
                            <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-black/[0.03]">
                              <CheckCircle2 className="w-5 h-5 text-agri-gold-500 mt-0.5 shrink-0" />
                              <span className="text-sm font-medium text-black/70">{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'specifications' && (
                      <div className="grid gap-3">
                        {Object.entries(product.specifications).map(([key, val], i) => (
                          <div key={i} className="flex justify-between items-center p-5 rounded-2xl bg-slate-50/50 border border-black/[0.02] hover:bg-white transition-colors">
                            <span className="text-sm font-bold text-black/40 uppercase tracking-widest">{key}</span>
                            <span className="text-sm font-black text-agri-green-800">{val}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === 'howToUse' && (
                      <div className="space-y-4">
                        {product.howToUse.map((step, i) => (
                          <div key={i} className="flex items-start gap-5 p-6 rounded-[1.5rem] bg-agri-earth-15 border border-black/5">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs font-black text-agri-green-800 shadow-sm border border-black/5 shrink-0">
                              {i + 1}
                            </div>
                            <span className="text-base text-black/70 font-medium pt-1">{step}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-5 mt-16 pt-12 border-t border-black/5">
                <button
                  onClick={() => handleEnquire()}
                  className="flex-1 px-10 py-5 bg-agri-green-800 text-white rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#2a5a45] transition-all shadow-xl shadow-agri-green-800/20 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" /> Enquire Institutional Rate
                </button>
                <Link
                  to="/agri-startup-platform"
                  className="flex-1 px-10 py-5 bg-white border-2 border-agri-green-800 text-agri-green-800 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-agri-green-50 transition-all flex items-center justify-center gap-2"
                >
                  <TrendingUp className="w-4 h-4" /> Startup Feasibility Report
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Products */}
        {product.relatedProducts.length > 0 && (
          <div className="mt-32 content-defer">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-xs font-black text-agri-gold-500 tracking-[0.3em] uppercase mb-3 block">Complementary</span>
                <h2 className="text-3xl font-black text-agri-green-800">Related Products</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {product.relatedProducts.map(relatedId => {
                const related = productDetailData.find(p => p.id === relatedId);
                if (!related) return null;
                const relatedMeta = CATEGORY_META[related.category];
                return (
                  <Link
                    key={related.id}
                    to={`/products/${related.category}/${related.id}`}
                    className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="relative aspect-square overflow-hidden bg-slate-100">
                      <OptimizedImage
                        src={PRODUCT_IMAGES[related.id]?.src || relatedMeta?.cardImage || LOCAL_FALLBACK}
                        alt={PRODUCT_IMAGES[related.id]?.alt || related.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        fallbackSrc={relatedMeta?.cardImage || LOCAL_FALLBACK}
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-agri-green-800 shadow-sm">
                        {related.categoryName}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-sm font-black text-agri-green-800 mb-2 group-hover:text-agri-gold-500 transition-colors line-clamp-1">
                        {related.name}
                      </h3>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xs font-bold text-gray-400">From ₹{related.pricing.retail.toLocaleString()}</span>
                        <div className="flex items-center text-agri-gold-500 text-xs font-black uppercase tracking-widest gap-1">
                          View <ChevronRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// Smart Router — 3-tier detection
// ══════════════════════════════════════════════════════════════════════════════
const ProductRouter: React.FC = () => {
  const { category, subcategory, productSlug } = useParams<{
    category: string;
    subcategory?: string;
    productSlug?: string;
  }>();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [category, subcategory, productSlug]);

  // Priority 1: 3-segment URL (/cat/sub/slug) → always product detail
  if (productSlug) {
    const product = productDetailData.find(p => p.id === productSlug && p.category === category);
    if (product) return <DetailView product={product} category={category || ''} />;
  }

  // Priority 2: 2-segment URL — detect if it's a direct product ID or a subcategory
  if (subcategory) {
    const product = productDetailData.find(p => p.id === subcategory && p.category === category);
    if (product) return <DetailView product={product} category={category || ''} />;
    // It's a real subcategory slug → show subcategory listing page
    return <SubcategoryPage category={category || ''} subcategory={subcategory} />;
  }

  // Priority 3: Category-only URL → show category page with subcategory grid
  if (category) return <CategoryPage category={category} />;

  return <Navigate to="/products" />;
};

export default ProductRouter;
