
import { PackageSearch } from 'lucide-react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
    searchQuery?: string,
    categoryName?: string
}

const EmptyState = ({ searchQuery, categoryName }: EmptyStateProps) => {

    return (
        <motion.div
            className="flex flex-col items-center justify-center py-16 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.3,
                ease: "easeOut"
            }}
        >
            <PackageSearch className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Inga produkter hittades</h3>
            <p className="text-gray-500 text-center max-w-md">
                {searchQuery
                    ? `Vi kunde inte hitta några produkter för "${searchQuery}"`
                    : categoryName
                        ? `Vi kunde inte hitta några produkter inom ${categoryName}`
                        : "Vi kunde inte hitta några produkter."
                }
            </p>
        </motion.div>
    )
};

export default EmptyState;