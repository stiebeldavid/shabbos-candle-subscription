import { useState } from "react";
import { Link } from "react-router-dom";
import { ShopifyProduct } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;
  const [selectedVariant, setSelectedVariant] = useState(node.variants.edges[0]?.node);

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    const cartItem = {
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions
    };
    
    addItem(cartItem);
    toast.success("Added to cart", {
      description: `${node.title} has been added to your cart`,
      position: "top-center",
    });
  };

  const imageUrl = node.images?.edges?.[0]?.node?.url;
  const price = parseFloat(selectedVariant?.price.amount || node.priceRange.minVariantPrice.amount);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/product/${node.handle}`}>
        <div className="aspect-square overflow-hidden bg-secondary/20">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={node.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No image
            </div>
          )}
        </div>
      </Link>
      
      <CardContent className="p-4">
        <Link to={`/product/${node.handle}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors">
            {node.title}
          </h3>
        </Link>
        {node.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {node.description}
          </p>
        )}
        <p className="text-xl font-bold">
          ${price.toFixed(2)}
        </p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart}
          className="w-full"
          disabled={!selectedVariant?.availableForSale}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
