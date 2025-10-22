import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductByHandle } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Loader2, ArrowLeft, ShoppingCart } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProductDetail() {
  const { handle } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const loadProduct = async () => {
      if (!handle) return;
      
      try {
        const fetchedProduct = await fetchProductByHandle(handle);
        setProduct(fetchedProduct);
        
        if (fetchedProduct?.variants?.edges?.[0]) {
          setSelectedVariant(fetchedProduct.variants.edges[0].node);
          
          const initialOptions: Record<string, string> = {};
          fetchedProduct.variants.edges[0].node.selectedOptions.forEach((opt: any) => {
            initialOptions[opt.name] = opt.value;
          });
          setSelectedOptions(initialOptions);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [handle]);

  const handleOptionChange = (optionName: string, value: string) => {
    const newOptions = { ...selectedOptions, [optionName]: value };
    setSelectedOptions(newOptions);

    const matchingVariant = product.variants.edges.find((edge: any) => {
      return edge.node.selectedOptions.every((opt: any) => 
        newOptions[opt.name] === opt.value
      );
    });

    if (matchingVariant) {
      setSelectedVariant(matchingVariant.node);
    }
  };

  const handleAddToCart = () => {
    if (!selectedVariant || !product) return;

    const cartItem = {
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions
    };
    
    addItem(cartItem);
    toast.success("Added to cart", {
      description: `${product.title} has been added to your cart`,
      position: "top-center",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar onOpenWaitlist={() => {}} />
        <div className="flex justify-center items-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar onOpenWaitlist={() => {}} />
        <div className="max-w-4xl mx-auto px-4 py-24">
          <p className="text-center text-muted-foreground">Product not found</p>
          <div className="text-center mt-4">
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const imageUrl = product.images?.edges?.[0]?.node?.url;
  const price = parseFloat(selectedVariant?.price.amount || product.priceRange.minVariantPrice.amount);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onOpenWaitlist={() => {}} />
      <main className="max-w-6xl mx-auto px-4 py-24">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-square overflow-hidden rounded-lg bg-secondary/20">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                No image
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              <p className="text-3xl font-bold text-primary">${price.toFixed(2)}</p>
            </div>

            {product.description && (
              <div>
                <h2 className="font-semibold mb-2">Description</h2>
                <p className="text-muted-foreground">{product.description}</p>
              </div>
            )}

            {product.options && product.options.length > 0 && (
              <div className="space-y-4">
                {product.options.map((option: any) => (
                  <div key={option.name}>
                    <label className="font-semibold mb-2 block">{option.name}</label>
                    <Select 
                      value={selectedOptions[option.name]} 
                      onValueChange={(value) => handleOptionChange(option.name, value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {option.values.map((value: string) => (
                          <SelectItem key={value} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            )}

            <Button 
              onClick={handleAddToCart}
              className="w-full"
              size="lg"
              disabled={!selectedVariant?.availableForSale}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>

            {selectedVariant && !selectedVariant.availableForSale && (
              <p className="text-sm text-muted-foreground text-center">
                This variant is currently out of stock
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
