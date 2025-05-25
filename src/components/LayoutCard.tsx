import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

type CustomerCardSectionProps = {
  title: React.ReactNode | string;
  content: React.ReactNode;
  description?: React.ReactNode | string;
  footer?: React.ReactNode;
};

export function LayoutCard({
  title,
  description,
  content,
  footer,
}: CustomerCardSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{content}</CardContent>
      {footer && (
        <CardFooter className="flex flex-col gap-4">{footer}</CardFooter>
      )}
    </Card>
  );
}
