export default async function CharacterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <div className="p-8">Character ID: {id}</div>;
}
