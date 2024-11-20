import { useState, useEffect } from 'react';
import { Leaf, Send, User } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar } from '@/components/ui/avatar';
import { getAiMessages, getUserMessages, sendMessage } from '@/service/Chat';

type Message = {
  content: string;
  isUser: boolean;
  isSuccess?: boolean;
  isQuestion?: boolean;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const userMessages = await getUserMessages();
        const aiMessages = await getAiMessages();

        const combinedMessages: Message[] = [];
        for (let i = 0; i < Math.max(userMessages.length, aiMessages.length); i++) {
          if (userMessages[i]) {
            combinedMessages.push({ content: userMessages[i], isUser: true, isQuestion: true });
          }
          if (aiMessages[i]) {
            combinedMessages.push({ content: aiMessages[i], isUser: false });
          }
        }
        setMessages(combinedMessages);
      } catch (error) {
        console.error('Error fetching initial messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const handleSend = async () => {
    if (input.trim()) {
      const newMessage = { content: input, isUser: true, isQuestion: true };
      setMessages((prev) => [...prev, newMessage]);
      setInput('');
      setIsSending(true);

      try {
        const response = await sendMessage(input);
        setMessages((prev) => [
          ...prev,
          { content: response, isUser: false, isSuccess: true },
        ]);
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages((prev) => [
          ...prev,
          { content: 'Erro ao enviar a mensagem. Tente novamente mais tarde.', isUser: false },
        ]);
      } finally {
        setIsSending(false);
      }
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Card className="w-full max-w-4xl m-auto mt-10 h-[80vh] flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle>Assistente de Energia - EcoSage Bot</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-full pr-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-4`}>
              {!message.isUser && (
                <div className="flex flex-col items-center justify-center">
                  <Avatar className="mr-2 bg-emerald-300 flex items-center justify-center">
                    <Leaf />
                  </Avatar>
                </div>
              )}
              <div
                className={`rounded-lg p-2 max-w-[90%] ${message.isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  } ${message.isSuccess ? 'bg-green-100' : ''}`}
              >
                {message.content.split('\n').map((line, lineIndex) => (
                  <div key={lineIndex}>
                    {line.replace(/\*/g, '')}
                  </div>
                ))}
              </div>
              {message.isUser && (
                <div className="flex flex-col items-center justify-center ml-2">
                  <Avatar className="bg-slate-300 flex items-center justify-center">
                    <User />
                  </Avatar>
                </div>
              )}
            </div>
          ))}
          {messages.some((message) => message.isSuccess) && (
            <div className="flex justify-center mt-4">
              <Button onClick={handleRefresh} className="bg-green-500 hover:bg-green-600 text-white">
                Atualizar
              </Button>
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex-shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex w-full gap-2"
        >
          <Input
            placeholder="Digite sua mensagem..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isSending}
          />
          <Button type="submit" size="icon" disabled={isSending}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
