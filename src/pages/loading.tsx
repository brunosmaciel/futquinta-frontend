import { Button } from '../components/Button';
import { useButtonLoading } from '../hooks/useButtonLoading';

export default function Loading() {
  const { setButtonLoading, isButtonLoading } = useButtonLoading();

  return (
    <Button
      isLoading={isButtonLoading}
      className="btn-primary"
      onClick={() => setButtonLoading(true)}
    >
      Teste
    </Button>
  );
}
