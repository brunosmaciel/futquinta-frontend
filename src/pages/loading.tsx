import { Button } from '../components/Button';
import { useButtonLoading } from '../hooks/useButtonLoading';

export default function Loading() {
  const { loadingClass, setButtonLoading } = useButtonLoading();

  return (
    <Button
      loadingClass={loadingClass}
      className="btn-primary"
      onClick={() => setButtonLoading(true)}
    >
      Teste
    </Button>
  );
}
