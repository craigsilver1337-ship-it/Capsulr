import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { cn } from "@/lib/utils";

type LogoItem = {
    name: string;
    hoverClassName?: string;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
    items: LogoItem[];
};

export function LogoCloud({ items }: LogoCloudProps) {
    return (
        <div className="relative mx-auto max-w-full bg-transparent py-12 md:py-16">
            <div className="container mx-auto px-4">
                <div className="mb-8 text-center">
                    <h3 className="text-sm font-semibold text-cyan-500/80 uppercase tracking-widest mb-3">
                        Ecosystem Partners & Infrastructure
                    </h3>
                    <h2 className="font-bold text-2xl md:text-3xl text-white tracking-tight">
                        Powering the Future
                    </h2>
                </div>

                <div className="relative mx-auto max-w-5xl">
                    {/* Horizontal Line Top */}
                    <div className="absolute -top-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

                    <div
                        style={{
                            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
                        }}
                    >
                        <InfiniteSlider gap={0} reverse speed={35} speedOnHover={10} className="py-4">
                            {items.map((item) => (
                                <div
                                    key={`logo-${item.name}`}
                                    className={cn(
                                        "mx-6 text-xl md:text-2xl font-black tracking-tight text-white/80 transition-all duration-300 cursor-default select-none",
                                        item.hoverClassName
                                    )}
                                >
                                    {item.name}
                                </div>
                            ))}
                        </InfiniteSlider>
                    </div>

                    {/* Horizontal Line Bottom */}
                    <div className="absolute -bottom-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                </div>
            </div>
        </div>
    );
}
