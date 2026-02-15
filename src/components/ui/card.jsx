import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * @typedef {Object} CardProps
 * @property {string} [className]
 */

/** @param {CardProps & React.ComponentProps<'div'>} props */
const Card = /** @type {any} */ (React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-xl border bg-card text-card-foreground shadow", className)}
    {...props} />
)));
Card.displayName = "Card"

/** @param {CardProps & React.ComponentProps<'div'>} props */
const CardHeader = /** @type {any} */ (React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props} />
)));
CardHeader.displayName = "CardHeader"

/** @param {CardProps & React.ComponentProps<'div'>} props */
const CardTitle = /** @type {any} */ (React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props} />
)));
CardTitle.displayName = "CardTitle"

/** @param {CardProps & React.ComponentProps<'div'>} props */
const CardDescription = /** @type {any} */ (React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props} />
)));
CardDescription.displayName = "CardDescription"

/** @param {CardProps & React.ComponentProps<'div'>} props */
const CardContent = /** @type {any} */ (React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
)));
CardContent.displayName = "CardContent"

/** @param {CardProps & React.ComponentProps<'div'>} props */
const CardFooter = /** @type {any} */ (React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props} />
)));
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
