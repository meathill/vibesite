import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FAQS } from './landing-data';

export function LandingFaq() {
  return (
    <section id="faq" className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-4 text-center text-2xl font-bold md:text-3xl">常见问题</h2>
        <p className="mb-8 text-center text-muted-foreground">有疑问？看看下面能不能找到答案</p>
        <Accordion multiple={false}>
          {FAQS.map((faq, index) => (
            <AccordionItem key={faq.question} value={`faq-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
