# Meridian design decisions

- **Color:** Deep ink surfaces create focus for operations; orange is reserved for primary action and active navigation, while blue communicates information, green success, red destructive actions, and gray secondary metadata.
- **Typography:** A compact geometric sans scale keeps operational density readable: 28px page titles, 18px section headings, 14px body copy, and 12px labels. Mobile titles reduce to 24px without reducing body legibility.
- **Spacing:** The interface follows a 4/8/12/16/24/32/40/48/64 rhythm. The page canvas uses a centered 1440px maximum with 32px desktop padding and 16px mobile padding.
- **Navigation:** Four labeled groups make the sidebar a hierarchy rather than a flat menu. The sidebar collapses at the tablet boundary and keeps its state inside the persistent app shell.
- **Detail pattern:** Orders use a right-side drawer on desktop and a full-screen detail view on mobile. This preserves list context while giving detail work more room without creating a fragmented route system.
- **Shared language:** Lists use one DataTable, forms use the same Input/Select validation contract, destructive actions use ConfirmDialog, loading uses Skeleton, and every module feeds the shared toast and notification systems.
- **Motion:** Motion is state-linked only: route entry, drawer/modal entry, loading shimmer, active navigation, and toast lifetime. `prefers-reduced-motion` disables decorative transitions.
