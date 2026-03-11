import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { messagesAPI, matchesAPI } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Send, ArrowLeft, Heart, MessageCircle } from 'lucide-react';

const MessagesPage = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    if (userId) {
      loadConversationWithUser(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (selectedConversation) {
      const interval = setInterval(() => {
        fetchMessages(selectedConversation.user.id, false);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [selectedConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchConversations = async () => {
    try {
      const response = await messagesAPI.getConversations();
      setConversations(response.data);
    } catch (error) {
      console.error('Failed to load conversations');
    } finally {
      setLoading(false);
    }
  };

  const loadConversationWithUser = async (otherUserId) => {
    try {
      const matchesResponse = await matchesAPI.getMatches();
      const matches = matchesResponse.data;
      const matchedUser = matches.find((m) => m.id === otherUserId);

      if (matchedUser) {
        setSelectedConversation({
          user: {
            id: matchedUser.id,
            name: matchedUser.name,
            photo: matchedUser.photos?.[0]
          }
        });
        await fetchMessages(otherUserId);
      } else {
        toast.error('Can only message matched users');
        navigate('/matches');
      }
    } catch (error) {
      toast.error('Failed to load conversation');
    }
  };

  const fetchMessages = async (otherUserId, showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      const response = await messagesAPI.getMessages(otherUserId);
      setMessages(response.data);
    } catch (error) {
      if (showLoading) {
        toast.error('Failed to load messages');
      }
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      await messagesAPI.send(selectedConversation.user.id, newMessage);
      setNewMessage('');
      await fetchMessages(selectedConversation.user.id, false);
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to send message');
    }
  };

  const selectConversation = (conv) => {
    setSelectedConversation(conv);
    fetchMessages(conv.user.id);
    navigate(`/messages/${conv.user.id}`);
  };

  return (
    <div className="h-[calc(100vh-64px)] bg-background-light dark:bg-background-dark" data-testid="messages-page">
      <div className="h-full max-w-7xl mx-auto flex">
        <div className="w-full md:w-80 border-r border-stone-200 dark:border-stone-800 bg-surface-light dark:bg-surface-dark">
          <div className="p-4 border-b border-stone-200 dark:border-stone-800">
            <h2 className="font-heading font-bold text-xl text-text-primary">
              <MessageCircle className="w-5 h-5 inline mr-2" />
              {t('messages')}
            </h2>
          </div>
          <div className="overflow-y-auto h-[calc(100%-73px)]">
            {loading && conversations.length === 0 ? (
              <p className="text-center py-8 text-text-secondary text-sm">{t('loading')}</p>
            ) : conversations.length === 0 ? (
              <div className="text-center py-8 px-4">
                <MessageCircle className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <p className="text-text-secondary text-sm">No conversations yet</p>
                <Button
                  variant="link"
                  onClick={() => navigate('/matches')}
                  className="mt-2 text-primary"
                >
                  View your matches
                </Button>
              </div>
            ) : (
              conversations.map((conv) => (
                <div
                  key={conv.conversation_id}
                  onClick={() => selectConversation(conv)}
                  className={`p-4 border-b border-stone-200 dark:border-stone-800 cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors ${
                    selectedConversation?.user?.id === conv.user.id ? 'bg-stone-100 dark:bg-stone-900' : ''
                  }`}
                  data-testid={`conversation-${conv.user.id}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-stone-200 dark:bg-stone-800 flex-shrink-0 overflow-hidden">
                      {conv.user.photo ? (
                        <img src={conv.user.photo} alt={conv.user.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Heart className="w-5 h-5 text-stone-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-text-primary truncate">{conv.user.name}</p>
                      <p className="text-sm text-text-secondary truncate">{conv.last_message}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              <div className="p-4 border-b border-stone-200 dark:border-stone-800 bg-surface-light dark:bg-surface-dark flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedConversation(null);
                    navigate('/messages');
                  }}
                  className="md:hidden"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <div className="w-10 h-10 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden flex-shrink-0">
                  {selectedConversation.user.photo ? (
                    <img
                      src={selectedConversation.user.photo}
                      alt={selectedConversation.user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-stone-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-text-primary">{selectedConversation.user.name}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/profile/${selectedConversation.user.id}`)}
                  data-testid="view-profile-from-chat"
                >
                  View Profile
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50 dark:bg-stone-950" data-testid="messages-container">
                {messages.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-text-secondary">No messages yet. Start the conversation!</p>
                  </div>
                ) : (
                  messages.map((msg, index) => {
                    const isOwn = msg.sender_id === user?.id;
                    return (
                      <div
                        key={index}
                        className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                        data-testid={`message-${index}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                            isOwn
                              ? 'bg-primary text-white rounded-br-sm'
                              : 'bg-surface-light dark:bg-surface-dark text-text-primary rounded-bl-sm'
                          }`}
                        >
                          <p className="break-words">{msg.message}</p>
                          <p
                            className={`text-xs mt-1 ${
                              isOwn ? 'text-white/70' : 'text-text-secondary'
                            }`}
                          >
                            {new Date(msg.created_at).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="p-4 border-t border-stone-200 dark:border-stone-800 bg-surface-light dark:bg-surface-dark">
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder={t('type_message')}
                    className="flex-1"
                    data-testid="message-input"
                  />
                  <Button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="bg-primary hover:bg-primary/90 text-white"
                    data-testid="send-message-btn"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-stone-50 dark:bg-stone-950">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 text-stone-300 mx-auto mb-4" />
                <p className="text-text-secondary">Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
