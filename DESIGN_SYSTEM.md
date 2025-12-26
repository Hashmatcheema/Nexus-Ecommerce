# NEXUS Design System

## Overview

The NEXUS design system is built on principles of ultra-premium minimalism, futuristic aesthetics, and intelligent design. Every component is crafted to feel cinematic, luxurious, and alive.

## Color Palette

### Primary Colors
```css
--futuristic-black: #0A0A0A
--futuristic-gray: #1A1A1A
--neon-cyan: #00F0FF
--neon-purple: #B026FF
```

### Gradients
- **Primary Gradient**: `linear-gradient(135deg, #00F0FF 0%, #B026FF 100%)`
- **Soft Gradient**: `linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)`
- **Futuristic Gradient**: Multi-stop gradient with neon colors

## Typography

### Display Text
- **Display 1**: `clamp(3rem, 8vw, 8rem)` - Hero headlines
- **Display 2**: `clamp(2rem, 5vw, 4rem)` - Section headers
- **Display 3**: `clamp(1.5rem, 3vw, 2.5rem)` - Subsection headers

### Body Text
- **Base**: System font stack with -webkit-font-smoothing
- **Sizes**: 14px - 24px depending on context
- **Line Height**: 1.5 - 1.8 for readability

## Components

### Glassmorphism
```css
.glass-effect {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### Buttons

#### Primary Button
- Gradient background (neon to purple)
- Rounded-full (pill shape)
- Hover: scale(1.05)
- Shadow: glow effect

#### Secondary Button
- Glass effect background
- Rounded-full
- Hover: bg-white/10

### Cards

#### Product Card
- Glass effect background
- Rounded-card (20px)
- Hover: translateY(-8px)
- Image with scale on hover
- Floating action buttons on hover

#### Info Card
- Glass effect background
- Rounded-card
- Padding: 24px - 48px
- Border: subtle white/10

### Navigation

#### Desktop
- Fixed position
- Glass effect on scroll
- Smooth transitions
- Logo with gradient text

#### Mobile
- Hamburger menu
- Slide-in drawer
- Curved bottom navigation

### Forms

#### Input Fields
- Glass effect background
- Rounded-xl (12px)
- Focus: ring-2 ring-neon
- Placeholder: white/40

#### Select Dropdowns
- Glass effect background
- Rounded-xl
- Custom styling

## Spacing System

- **Base Unit**: 4px
- **Scale**: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128

## Border Radius

- **Pill**: `9999px` - Buttons, badges
- **Card**: `20px` - Product cards, containers
- **Glass**: `24px` - Large containers
- **Input**: `12px` - Form fields

## Shadows

- **Soft**: `0 4px 20px rgba(0, 0, 0, 0.08)`
- **Glass**: `0 8px 32px 0 rgba(31, 38, 135, 0.37)`
- **Glow**: `0 0 20px rgba(0, 240, 255, 0.3)`
- **Glow Purple**: `0 0 30px rgba(176, 38, 255, 0.4)`

## Animations

### Float
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
```

### Glow
```css
@keyframes glow {
  0% { box-shadow: 0 0 20px rgba(0, 240, 255, 0.3); }
  100% { box-shadow: 0 0 40px rgba(0, 240, 255, 0.6); }
}
```

### Slide Up
```css
@keyframes slideUp {
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
```

## Layout Principles

### Grid System
- **Desktop**: 12-column grid
- **Tablet**: 8-column grid
- **Mobile**: 4-column grid

### Container Widths
- **Max Width**: 1280px (7xl)
- **Padding**: 24px mobile, 48px desktop

### Section Spacing
- **Vertical**: 96px (py-24)
- **Horizontal**: 24px mobile, 48px desktop

## Interactive States

### Hover
- Scale: 1.05 - 1.1
- Background: white/10
- Transform: translateY(-8px) for cards

### Active
- Scale: 0.95
- Background: white/20

### Focus
- Ring: 2px solid neon
- Outline: none

## AI Assistant Design

### Orb
- Fixed position: bottom-right
- Size: 64px
- Gradient background
- Pulsing animation
- Glow shadow

### Modal
- Full-screen overlay
- Glass effect container
- Curved message bubbles
- Floating product cards
- Smooth animations

## Mobile Considerations

- **Touch Targets**: Minimum 44px
- **Bottom Navigation**: Curved, floating
- **Drawers**: Slide-in from sides
- **Typography**: Scales down appropriately
- **Spacing**: Reduced on mobile

## Accessibility

- **Color Contrast**: WCAG AA compliant
- **Focus States**: Visible on all interactive elements
- **Keyboard Navigation**: Full support
- **Screen Readers**: Semantic HTML

## Performance

- **Images**: Next.js Image optimization
- **Animations**: GPU-accelerated transforms
- **Lazy Loading**: Components load on view
- **Code Splitting**: Automatic with Next.js

---

This design system ensures consistency, luxury, and futuristic aesthetics across all components and pages.



