import { Variation } from "./variationTypes";

type Props = {
  variations: Variation[];
};

export default function VariationList({ variations }: Props) {
  return (
    <table border={1} cellPadding={8} cellSpacing={0}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {variations.map((v) => (
          <tr key={v.id}>
            <td>{v.id}</td>
            <td>{v.title}</td>
            <td>{v.status}</td>
            <td>{new Date(v.created_at).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}