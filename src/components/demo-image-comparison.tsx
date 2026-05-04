import { ImageComparison } from "@/components/ui/image-comparison-slider";

export default function DemoOne() {
  return (
    <div className="w-full min-h-screen bg-gray-900 flex flex-col items-center justify-center font-sans p-4">
      <div className="w-full text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Image Comparison Slider</h1>
        <p className="text-lg text-gray-400">Drag the slider to compare the two images.</p>
      </div>
      
      <ImageComparison
        beforeImage="/images/before-after/before.png"
        afterImage="/images/before-after/after.png"
        altBefore="Before image"
        altAfter="After image"
      />
    </div>
  )
}
