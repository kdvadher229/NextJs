export const metadata = {
    title: 'Documentation', // layout.tsx metadata get overwritten by the page.tsx's metadata
  }
  
  export default function DocumentationLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <>
            {children}
            <h1>This is docs layout</h1>
        </>
    )
  }
  
  // deepest level metadata is used in DOM